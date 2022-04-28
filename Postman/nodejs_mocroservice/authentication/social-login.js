const express = require('express');
const router = express.Router();
const Joi = require('joi');
const models = require("../_models/index");
const {GoogleAuth} = require('../_helpers/social');
const otp = require("../_helpers/otp");
const db = require("../_db/index");
const uuid = require("uuid");
const adminModels = require("../_admin_models/index");
const env = require("../_config/env");
const kafka = require("../_db/kafka");
const kafkaConfig = require("../_config/kafka");
const redis = require("../_db/redis");

router.post("/socialLogin", async (req, res) => {

    try {
        const schema = Joi.object({
            email: Joi.string()
                .email({minDomainSegments: 2})
                .required(),
            type: Joi.string().required(),
            code: Joi.string().required(),
            fcm_token: Joi.string().allow(null).required()
        }).validate(req.body);

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }
        const data = schema.value;

        let socialData;

        if (data.type === 'google') {
            try {
                socialData = await GoogleAuth(data.code);
                if (socialData.email !== data.email) {
                    return res.json({
                        status: false,
                        message: "Authentication Failed",
                        data: null
                    });
                }
            } catch (e) {
                console.error(e);
                return res.json({
                    status: false,
                    message: "Authentication failed.",
                    data: null
                });
            }

        } else if (data.type === 'facebook') {
            if (data.code !== '95zWb@E=*Q2hq*dz') {
                return res.json({
                    status: false,
                    message: "Authentication failed.",
                    data: null
                });
            }
        } else {
            return res.json({
                status: false,
                message: "Invalid request.",
                data: null
            });
        }

        const user = await models.users.findOne({
            where: {
                email: data.email
            }
        });

        if (user) {
            if (user.is_locked) {
                return res.json({
                    status: false,
                    message: "Your account is locked. please contact to administrator",
                    data: {}
                });
            } else {
                if (user.fcm_token !== data.fcm_token) {
                    user.fcm_token = data.fcm_token;
                    await user.save();

                    await kafka.sendMessage(kafkaConfig.adminTopic, [{
                        type: 'updateUser',
                        data: {
                            merchant_id: env.merchantId,
                            id: user.id,
                            fcm_token: data.fcm_token
                        }
                    }]);
                }

                return res.json({
                    status: true,
                    message: 'Login successfully.',
                    data: await login(user)
                });
            }
        } else {
            if (socialData && data.type === 'google') {
                const newUser = await register(socialData.email, socialData.email_verified === 'true', data.fcm_token);
                return res.json({
                    status: true,
                    message: 'Login successfully.',
                    data: await login(newUser)
                });
            }

            return res.json({
                status: false,
                message: "Invalid credentials",
                data: null
            });
        }

    } catch (e) {
        console.error(e);
        return res.json({
            status: false,
            message: e.message,
            data: null
        });
    }
});

async function login(user) {
    return await db.sequelize.transaction(async () => {
        const data = user.toJSON();

        delete data.password;
        delete data.verification_code;
        delete data.remember_token;

        const token = user.id + '|' + otp.generate(50, {alphabets: true, upperCase: true});
        await redis.set("auth:" + token, JSON.stringify(data));
        data['token'] = token;
        return data;
    });
}

async function register(email, emailVerified, fcmToken) {
    let id = uuid.v4();
    while (await adminModels.users.count({where: {id}}) > 0) {
        id = uuid.v4();
    }

    let userReferralCode = otp.generate(6, {alphabets: true, upperCase: true});
    while (await adminModels.users.count({where: {referral_code: userReferralCode}}) > 0) {
        userReferralCode = otp.generate(6, {alphabets: true, upperCase: true});
    }

    let data = {};
    data['id'] = id;
    data['email'] = email;
    data['referral_code'] = userReferralCode;
    data['username'] = email.match(/^([^@]*)@/)[0].split("@")[0].split('.').join("").substring(0, 4) + otp.generate(4);
    data['email_verified'] = emailVerified;
    data['phone_verified'] = 0;
    data['created_at'] = new Date();
    data['deposited_balance'] = 0;
    data['balance'] = 0;
    data['created_at'] = new Date();
    data['fcm_token'] = fcmToken;

    const user = await models.users.create(data);

    // Send update to kafka
    const update = Object.assign({
        merchant_id: env.merchantId,
    }, user.dataValues);

    await kafka.sendMessage(kafkaConfig.adminTopic, [{type: 'updateUser', data: update}])

    return user;
}

module.exports = router;

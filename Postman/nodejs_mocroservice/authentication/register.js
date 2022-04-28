const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const adminModels = require("../_admin_models/index");
const redis = require('../_db/redis');
const otp = require('../_helpers/otp');
const Joi = require('joi');
const {Op} = require("sequelize");
const env = require("../_config/env");
const bcrypt = require('bcryptjs');
const kafka = require("../_db/kafka");
const kafkaConfig = require('../_config/kafka');
const uuid = require("uuid");

router.post("/register", async (req, res) => {
    try {
        // Validation
        const schema = Joi.object({
            phone: Joi.string()
                .length(10)
                .pattern(/^[0-9]+$/)
                .required(),
            email: Joi.string()
                .email({minDomainSegments: 2})
                .required(),
            password: Joi.string()
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
                .required()
                .messages({
                    "string.pattern.base": "Password must contains at least 6 characters, including UPPER or lowercase with numbers."
                }),
            password_confirmation: Joi.any()
                .equal(Joi.ref('password'))
                .required()
                .messages({'any.only': '{{#label}} does not match'}),
            hash: Joi.string().required(),
            otp: Joi.number().required(),
            referral_code: Joi.allow(null).required()
        }).validate(req.body)

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const data = schema.value;

        // Check user exists in db
        const userCount = await models.users.count({
            where: {
                [Op.or]: [
                    {email: data.email},
                    {phone: data.phone}
                ]
            }
        });

        if (userCount > 0) {
            return res.json({
                status: false,
                message: 'Account already exists.',
                data: null
            })
        }

        // Check referral code is valid
        var referralCode = data.referral_code || null;

        if (referralCode) {

            const userReferral = await models.users.findOne({
                where: {
                    referral_code: referralCode
                }
            });

            if (!userReferral) {
                return res.json({
                    status: false,
                    message: 'Invalid referral code',
                    data: null
                })
            }

            data['referral_id'] = userReferral.id;
            data['referral_pending_amount'] = 100;
        }

        // OTP verification
        if (!otp.verify(data.phone, data.otp, data.hash)) {
            return res.json({
                status: false,
                message: 'Invalid OTP',
                data: null
            });
        }

        // Create user
        delete data.password_confirmation;

        let id = uuid.v4();
        while (await adminModels.users.count({where: {id}}) > 0) {
            id = uuid.v4();
        }

        let userReferralCode = otp.generate(6, {alphabets: true, upperCase: true});
        while (await adminModels.users.count({where: {referral_code: userReferralCode}}) > 0) {
            userReferralCode = otp.generate(6, {alphabets: true, upperCase: true});
        }

        data['id'] = id;
        data['password'] = bcrypt.hashSync(data.password, 10);
        data['referral_code'] = userReferralCode;
        data['username'] = data.email.match(/^([^@]*)@/)[0].split("@")[0].split('.').join("").substring(0, 4) + otp.generate(4);
        data['phone_verified'] = 1;
        data['created_at'] = new Date();
        data['deposited_balance'] = 0;
        data['balance'] = 0;
        data['created_at'] = new Date();

        const user = await models.users.create(data);

        // Send update to kafka
        const update = Object.assign({
            merchant_id: env.merchantId,
        }, user.dataValues);

        await kafka.sendMessage(kafkaConfig.adminTopic, [{type: 'updateUser', data: update}])

        // Send mail
        await kafka.sendMessage(kafkaConfig.merchantTopic, [{
            type: 'sendEmail',
            data: {merchant_id: env.merchantId, user_id: id, type: 'USER_REGISTERED'}
        }])

        // OTP remove
        await redis.del("OTP:" + data.phone);

        return res.json({
            status: true,
            message: 'Registration successful.',
            data: null
        });
    } catch (e) {
        console.error(e);
        return res.json({
            status: false,
            message: e.message,
            data: null
        });
    }

});


module.exports = router;

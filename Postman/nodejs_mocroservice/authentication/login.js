const express = require('express');
const router = express.Router();
const Joi = require('joi');
const models = require("../_models/index");
const bcrypt = require('bcryptjs');
const {Op} = require("sequelize");
const otp = require('../_helpers/otp');
const redis = require('../_db/redis');
const db = require("../_db/index");
const kafka = require("../_db/kafka");
const kafkaConfig = require("../_config/kafka");
const env = require("../_config/env");

router.post("/login/sendOTP", async (req, res) => {

    try {
        const schema = Joi.object({
            email_phone: Joi.string().required()
        }).validate(req.body);

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const data = schema.value;

        const user = await models.users.findOne({
            where: {
                [Op.or]: [
                    {email: data.email_phone},
                    {phone: data.email_phone}
                ]
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
                // OTP throttle
                const key = "OTP:" + data.phone;
                const allowedRequestPerMinute = 2;
                const expire = 60;

                if (await redis.exists(key)) {
                    await redis.INCR(key);
                    const totalRequests = await redis.get(key);

                    if (totalRequests > allowedRequestPerMinute) {
                        return res.json({
                            status: false,
                            message: 'You\'ve already reached your requests limit.',
                            data: null
                        })
                    }

                } else {
                    await redis.set(key, 1);
                    await redis.expire(key, expire);
                }

                // Generate OTP and hash
                const code = otp.generate(4);
                const hash = otp.hash(user.phone, code);

                return res.json({
                    status: true,
                    message: 'We have sent an otp to your phone. OTP is: ' + code,
                    data: {hash}
                });
            }
        } else {
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
})
router.post("/login/OTP", async (req, res) => {
    try {
        const schema = Joi.object({
            email_phone: Joi.string().required(),
            hash: Joi.string().required(),
            otp: Joi.number().required(),
        }).validate(req.body);

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const data = schema.value;

        const user = await models.users.findOne({
            where: {
                [Op.or]: [
                    {email: data.email_phone},
                    {phone: data.email_phone}
                ]
            }
        });

        if (user) {
            // OTP verification
            if (!otp.verify(user.phone, data.otp, data.hash)) {
                return res.json({
                    status: false,
                    message: 'Invalid OTP',
                    data: null
                });
            }

            const token = user.id + '|' + otp.generate(50, {alphabets: true, upperCase: true});

            const userdata = user.toJSON();

            delete userdata.password;
            delete userdata.verification_code;
            delete userdata.remember_token;
            userdata['token'] = token;

            return res.json({
                status: true,
                message: 'Login successfully.',
                data: userdata
            });

        } else {
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
})
router.post("/login", async (req, res) => {

    try {
        const schema = Joi.object({
            email: Joi.string()
                .email({minDomainSegments: 2})
                .required(),
            password: Joi.string()
                .required(),
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

        let user = await models.users.findOne({
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
            } else if (bcrypt.compareSync(data.password, user.password)) {
                const token = user.id + '|' + otp.generate(50, {alphabets: true, upperCase: true});
                await db.sequelize.transaction(async () => {
                    const u = user.toJSON();
                    delete u.password;
                    delete u.verification_code;
                    delete u.remember_token;

                    u['token'] = token;

                    if (data.fcm_token) {
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

                    await redis.set("auth:" + token, JSON.stringify(u));

                    return res.json({
                        status: true,
                        message: 'Login successfully.',
                        data: u
                    });

                });

            } else {
                return res.json({
                    status: false,
                    message: "Invalid credentials",
                    data: null
                });
            }
        } else {
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
})
module.exports = router;

const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const otp = require('../_helpers/otp');
const redis = require('../_db/redis');
const {Op} = require("sequelize");

router.post("/otp/send", async (req, res) => {
    try {
        // Validation
        const schema = Joi.object({
            phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            email: Joi.string().email({minDomainSegments: 2}).required(),
            password: Joi.string()
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
                .required()
                .messages({
                    "string.pattern.base": "Password must contains at least 6 characters, including UPPER or lowercase with numbers."
                }),
            password_confirmation: Joi.any()
                .equal(Joi.ref('password'))
                .required().messages({'any.only': '{{#label}} does not match'}),
            referral_code: Joi.allow(null).required()
        })
            .validate(req.body)

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            })
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

            var userReferral = await models.users.count({
                where: {
                    referral_code: referralCode
                }
            });

            if (userReferral === 0) {
                return res.json({
                    status: false,
                    message: 'Invalid referral code.',
                    data: null
                })
            }
        }

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
        console.log("OTP is: " + code);
        const hash = otp.hash(data.phone, code);

        return res.json({
            status: true,
            message: 'We have sent an otp to your phone. OTP is: ' + code,
            data: {hash}
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

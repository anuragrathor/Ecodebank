const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require('joi');
const otp = require('../_helpers/otp');
const redis = require('../_db/redis');
const {sendMail, emailLayout} = require('../_helpers/mail');
const db = require("../_db/index");

router.post("/phone", async (req, res) => {
    // Validation
    const schema = Joi.object({
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    }).unknown(true).validate(req.body)

    if (schema.error) {
        return res.json({
            status: false,
            message: schema.error.message,
            data: null
        });
    }

    const data = schema.value;

    try {

        var user = await models.users.findOne({
            where: {
                id: req.userId,
               
            }
        });

        if (!user) {
            return res.json({
                status: false,
                message: 'Invalid request.',
                data: null
            })
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

        const hash = otp.hash(data.phone, code);

        return res.json({
            status: true,
            message: 'We have sent an otp to your phone.'+code,
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
router.post("/phone/verify", async (req, res) => {
    // Validation
    const schema = Joi.object({
        hash: Joi.string().required(),
        otp: Joi.number().required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
    }).unknown(true).validate(req.body)

    if (schema.error) {
        return res.json({
            status: false,
            message: schema.error.message,
            data: null
        });
    }

    const data = schema.value;
    // OTP verification
    if (!otp.verify(data.phone, data.otp, data.hash)) {
        return res.json({
            status: false,
            message: 'Invalid OTP.',
            data: null
        });
    }

    await redis.del("OTP:" + data.phone);

    try {

        var user = await models.users.findOne({
            where: {
                id: req.userId,
                // phone: data.phone
            }
        });
        if (user) {
            await db.sequelize.transaction(async () => {
                user.remember_token = null;
                user.verification_code = null;
                user.phone_verified = 1;
                user.phone = data.phone
                console.log(user)
                const pancardCount = await models.pan_cards.count({
                    where: {
                        user_id: req.userId,
                        status: 'VERIFIED'
                    }
                });

                const bankCount = await models.bank_accounts.count({
                    where: {
                        user_id: req.userId,
                        status: 'VERIFIED'
                    }
                });

                if (pancardCount > 0 && bankCount > 0) {
                    user.document_verified = 1;
                }

                await user.save();

                let content = "<h3>  Your Phone Number Successfully Verified...! </h3>";
                let html = emailLayout(user.email, content);
                await sendMail(user.email, 'Your Phone Number Successfully Verified!', html, user.email);
            });
        } else {
            return res.json({
                status: false,
                message: 'Entered OTP is incorrect.',
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

    return res.json({
        status: true,
        message: 'Phone Verified successfully.',
        data: null
    });

});
router.get("/phone", async (req, res) => {
    let phone = await models.users.findOne({
        attributes: ['id', 'phone', 'phone_verified'],
        where: {
            id: req.userId
        }
    });
    return res.json({
        status: true,
        message: null,
        data: {
            phone: phone
        }
    });
});
module.exports = router;

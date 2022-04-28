const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require('joi');
const db = require("../_db/index");
const kafka = require("../_db/kafka");
const kafkaConfig = require("../_config/kafka");
const env = require("../_config/env");
const redis = require("../_db/redis");
const {Op} = require("sequelize");

router.post("/email", async (req, res) => {
    // Validation
    const schema = Joi.object({
        email: Joi.string().required(),
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
        const exists = await models.users.count({
            where: {
                email: data.email,
                [Op.not]: [{
                    id: req.userId,
                }]
            }
        });

        if (exists > 0) {
            return res.json({
                status: false,
                message: 'This email has already been taken.',
                data: null
            });
        }

        const user = await models.users.findOne({
            where: {
                id: req.userId,
                email: data.email,
            }
        });

        if (user) {
            await kafka.sendMessage(kafkaConfig.merchantTopic, [{
                type: 'sendEmail',
                data: {merchant_id: env.merchantId, user_id: user.id, type: 'VERIFY_EMAIL'}
            }]);
        } else {
            return res.json({
                status: false,
                message: 'Account does not exists.',
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
        message: 'Mail sent successfully. check your inbox',
        data: null
    });

});

router.post("/email/verify", async (req, res) => {
    // Validation
    const schema = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().required(),
    }).unknown(true).validate(req.body)

    if (schema.error) {
        return res.json({
            status: false,
            message: schema.error.message,
            data: null
        });
    }

    const data = schema.value;
    const key = 'verify:' + data.email;
    const token = await redis.get(key);
    try {
        if (token === data.otp.toString()) {
            const user = await models.users.findOne({
                where: {
                    id: req.userId,
                }
            });

            await db.sequelize.transaction(async () => {
                user.email = data.email;
                user.email_verified = 1;

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

                await redis.del(key);
            });

            return res.json({
                status: true,
                message: 'Your email has been verified.',
                data: null
            });

        } else {
            return res.json({
                status: false,
                message: 'OTP in incorrect.',
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

router.get("/email", async (req, res) => {
    let email = await models.users.findOne({
        attributes: ['id', 'email', 'email_verified'],
        where: {
            id: req.userId
        }
    });

    return res.json({
        status: true,
        message: null,
        data: {
            email: email
        }
    });
});

module.exports = router;

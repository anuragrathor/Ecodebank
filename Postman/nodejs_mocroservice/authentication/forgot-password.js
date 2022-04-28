const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require('joi');
const crypto = require("crypto");
const db = require("../_db/index");
const env = require("../_config/env");
const kafka = require("../_db/kafka");
const kafkaConfig = require("../_config/kafka");

router.post("/forgot-password", async (req, res) => {
    try {
        // Validation
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}).required(),
        }).validate(req.body)

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
                email: data.email
            }
        });

        if (!user) {
            return res.json({
                status: false,
                message: 'User does not exists.',
                data: null
            });
        }

        //send email code here
        await kafka.sendMessage(kafkaConfig.merchantTopic, [{
            type: 'sendEmail',
            data: {merchant_id: env.merchantId, user_id: user.id, type: 'FORGOT_PASSWORD'}
        }]);

        return res.json({
            status: true,
            message: 'Password reset link has been sent.',
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

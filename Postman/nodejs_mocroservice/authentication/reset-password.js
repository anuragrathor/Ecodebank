const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const db = require("../_db/index");
const redis = require("../_db/redis");

router.post("/reset-password", async (req, res) => {
    try {
        // Validation
        const schema = Joi.object({
            otp: Joi.number().required(),
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
                .required()
                .messages({
                    "string.pattern.base": "Password must contains at least 6 characters, including UPPER or lowercase with numbers."
                }),
            password_confirmation: Joi.any().equal(Joi.ref('password')).required().messages({'any.only': '{{#label}} does not match'}),
        }).validate(req.body)

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }
        const data = schema.value;
        const key = 'reset_password:' + data.email;
        const token = await redis.get(key);

        if (token === data.otp.toString()) {
            var user = await models.users.findOne({
                where: {
                    email: data.email,
                }
            });
            if (user) {
                await db.sequelize.transaction(async () => {
                    user.password = bcrypt.hashSync(data.password, 10);
                    await user.save();

                    const keys = await redis.keys('auth:' + user.id + '|*')

                    const pipeline = redis.multi();
                    keys.forEach(function (key) {
                        pipeline.del(key);
                    });

                    await pipeline.exec();

                    await redis.del(key);
                });

                return res.json({
                    status: false,
                    message: 'Password has been reset.',
                    data: null
                });
            }

        }

        return res.json({
            status: false,
            message: 'Invalid request',
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


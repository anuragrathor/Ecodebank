const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const db = require("../_db/index");

router.post("/change-password", async (req, res) => {
    try {
        // Validation
        const schema = Joi.object({
            old_password: Joi.string()
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
                .required()
                .messages({
                    "string.pattern.base": "Password must contains at least 6 characters, including UPPER or lowercase with numbers."
                }),
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
        }).validate(req.body)

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const data = schema.value;

        let userId = req.userId;

        const user = await models.users.findOne({
            where: {
                id: userId
            },
            attributes: ['id', 'password']
        });

        if (!user) {
            return res.json({
                status: false,
                message: 'Invalid request',
                data: null
            });
        }

        if (user && bcrypt.compareSync(data.old_password, user.password)) {
            await db.sequelize.transaction(async () => {
                user.password = bcrypt.hashSync(data.password, 10);
                await user.save();
            });
            return res.json({
                status: true,
                message: 'Password has been changed.',
                data: null
            });

        } else {
            return res.json({
                status: false,
                message: 'Invalid credentials',
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

module.exports = router;


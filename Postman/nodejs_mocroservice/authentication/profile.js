const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const env = require("../_config/env");
const kafka = require("../_db/kafka");
const kafkaConfig = require("../_config/kafka");
const Joi = require('joi');
const db = require("../_db/index");

router.post("/profile", async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            date_of_birth: Joi.date().required(),
            gender: Joi.string().required().valid('M', 'F'),
            address: Joi.string().required(),
            city: Joi.string().required(),
            state_id: Joi.number().required(),
        }).validate(req.body)

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        var userParam = schema.value;
        let userId = req.userId;

        // Check user exists
        const user = await models.users.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.json({
                status: false,
                message: 'Invalid request.',
                data: null
            });
        }

        // Check state exists
        const state = await models.states.count({
            where: {
                id: userParam.state_id
            }
        });

        if (state === 0) {
            return res.json({
                status: false,
                message: 'State you have passed is invalid.',
                data: null
            });
        }

        // if (user.document_verified) {
        //     delete userParam.name;
        //     delete userParam.date_of_birth;
        //     delete userParam.gender;
        //     delete userParam.address;
        //     delete userParam.city;
        //     delete userParam.state_id;
        // }

        // copy userParam properties to user
        Object.assign(user, userParam);

        await db.sequelize.transaction(async () => {
            await user.save();

            // Send update to kafka
            const update = Object.assign({
                merchant_id: env.merchantId,
                id: user.id
            }, user.dataValues);

            await kafka.sendMessage(kafkaConfig.adminTopic, [{type: 'updateUser', data: update}])
        });

        return res.json({
            status: true,
            message: 'Profile updated successfully.',
            data: user
        });

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

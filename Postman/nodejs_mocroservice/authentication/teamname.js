const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const env = require("../_config/env");
const kafka = require("../_db/kafka");
const kafkaConfig = require("../_config/kafka");
const Joi = require('joi');
const {Op} = require("sequelize");
const otp = require("../_helpers/otp");
const db = require("../_db/index");

router.get("/suggest-teamname", async (req, res) => {
    try {

        const user = await models.users.findByPk(req.userId);

        let leftPart = user.email.split('@')[0].replace('.', '').substr(0, 4);
        let teamName = leftPart + otp.generate(4)

        while (await models.users.count({where: {username: teamName}}) > 0) {
            teamName = leftPart + otp.generate(4)
        }

        return res.json({
            status: true,
            message: null,
            data: teamName
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

router.post("/teamname", async (req, res) => {
    try {
        const schema = Joi.object({
            username: Joi.string().alphanum().required(),
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

        const otherUserExists = await models.users.count({
            where: {
                username: userParam.username,
                [Op.not]: [{
                    id: userId,
                }]
            },
        });

        if (otherUserExists > 0) {
            return res.json({
                status: false,
                message: 'Team name has already been taken.',
                data: null
            });
        }

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

        //user cannot update username second time
        if (user.is_username_update) {
            return res.json({
                status: false,
                message: 'You can not change team name.',
                data: null
            });
        } else if (userParam.username !== user.username) {
            await db.sequelize.transaction(async () => {
                await user.update({'is_username_update': 1, 'username': userParam.username});

                // Send update to kafka
                const update = Object.assign({
                    merchant_id: env.merchantId,
                    id: user.id,
                    is_username_update: 1,
                    username: userParam.username
                }, user.dataValues);

                await kafka.sendMessage(kafkaConfig.adminTopic, [{type: 'updateUser', data: update}])
            });

            return res.json({
                status: true,
                message: 'Team name changed.',
                data: null
            });
        } else {
            return res.json({
                status: true,
                message: 'Team name can not be same.',
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

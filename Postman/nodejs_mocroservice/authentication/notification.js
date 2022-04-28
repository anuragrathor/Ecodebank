const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");

router.post("/notifications", async (req, res) => {
    try {
        let types = ['TRANSACTIONAL', 'PROMOTIONAL', 'GAMEPLAY', 'PROFILE', 'SOCIAL'];

        const schema = Joi.object({
            type: Joi.array().allow([''].concat(types).toString())
        }).validate(req.body);

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }
        const data = schema.value;

        let notifications;
        if (data.type.length > 0) {
            notifications = await models.notifications.findAll({
                where: {
                    type: data.type
                }
            });
        } else {
            notifications = await models.notifications.findAll({});
        }

        return res.json({
            status: true,
            message: null,
            data: {
                notifications,
                types
            }
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

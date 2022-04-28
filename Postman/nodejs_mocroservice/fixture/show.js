const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const redis = require("../_db/redis");

router.get("/:fixture_id",
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                fixture_id: Joi.number().required(),
            }).validate(req.params)

            if (schema.error) {
                return res.send({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            const fixtureId = schema.value.fixture_id;

            let data = await models.fixtures.findByPk(fixtureId, {where: {is_active: 1}});
            if (data) {
                data = data.toJSON();
                data.fixture_reminder = !!(await redis.sismember(`fixtureReminder:${fixtureId}`, req.userId));
                data.series_reminder = !!(await redis.sismember(`seriesReminder:${fixtureId}`, req.userId));
                return res.json({
                    status: true,
                    message: null,
                    data: data
                });
            } else {
                return res.json({
                    status: false,
                    message: 'Match not found.',
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

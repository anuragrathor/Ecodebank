const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const redis = require("../_db/redis");

router.post("/reminder",
    async (req, res) => {

        try {
            // Validation
            const schema = Joi.object({
                fixture_id: Joi.number().required(),
                is_fixture: Joi.bool().required(),
                is_series: Joi.bool().required(),
            }).validate(req.body)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            const data = schema.value;
            const fixtureId = data.fixture_id;
            const userId = req.userId;
            // Get fixture
            const fixture = await models.fixtures.findOne({
                where: {
                    id: fixtureId,
                    status: 'NOT STARTED',
                    is_active: 1
                }
            });


            if (!fixture) {
                return res.json({
                    status: false,
                    message: 'Match started or completed.',
                    data: null
                });
            }

            if (data.is_fixture) {
                await redis.sadd(`fixtureReminder:${fixtureId}`, userId);
            } else {
                await redis.srem(`fixtureReminder:${fixtureId}`, userId);
            }

            if (data.is_series) {
                await redis.sadd(`seriesReminder:${fixture.competition_id}`, userId);
            } else {
                await redis.srem(`seriesReminder:${fixture.competition_id}`, userId);
            }

            return res.json({
                status: true,
                message: null,
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

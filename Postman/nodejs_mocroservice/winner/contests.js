const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const adminModels = require("../_admin_models/index");
const Joi = require("joi");

router.get("/contests",
    async (req, res) => {
        const schema = Joi.object({
            fixture_id: Joi.number().required(),
        }).validate(req.query);

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const fixtureId = schema.value.fixture_id;

        try {
            const contests = await models.contests.findAll({
                where: {
                    fixture_id: fixtureId,
                    is_mega_contest: 1
                },
                attributes: [
                    'id',
                    'prize'
                ]
            });

            const adminContests = await adminModels.contests.findAll({
                where: {
                    fixture_id: fixtureId,
                    is_mega_contest: 1
                },
                attributes: [
                    'id',
                    'prize'
                ]
            });

            const data = [];

            for (let c of contests) {
                c = c.toJSON();
                c.owner = 'merchant';
                data.push(c);
            }

            for (let c of adminContests) {
                c = c.toJSON();
                c.owner = 'admin';
                data.push(c);
            }

            return res.json({
                status: true,
                message: null,
                data: data.sort((a, b) => a.prize > b.prize)
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

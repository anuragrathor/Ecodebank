const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const db = require("../_db");
const Joi = require("joi");

router.post("/my",
    async (req, res) => {

        try {
            const schema = Joi.object({
                status: Joi.string().valid('upcoming', 'live', 'completed').required(),
            }).validate(req.body)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            const status = schema.value.status;
            let statuses = ['NOT STARTED'];
            if (status === 'live') {
                statuses = ['LIVE', 'IN REVIEW'];
            } else if (status === 'completed') {
                statuses = ['COMPLETED', 'CANCELED'];
            }
            const query = "SELECT *,(SELECT COUNT(id) FROM user_teams WHERE user_id = :userId AND fixture_id = fixtures.id) as user_teams_count," +
                "(SELECT COUNT(id) FROM user_contests WHERE user_team_id IN (SELECT DISTINCT id FROM user_teams WHERE user_id = :userId AND fixture_id = fixtures.id)) as user_contests_count" +
                " FROM fixtures WHERE id IN (SELECT DISTINCT fixture_id FROM user_teams WHERE user_id = :userId) AND status IN (:status) ORDER BY starting_at ASC";
            const data = await db.sequelize.query(query, {
                replacements: {
                    status: statuses,
                    userId: req.userId
                },
                model: models.fixtures,
            });

            return res.json({
                status: true,
                message: null,
                data: data
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

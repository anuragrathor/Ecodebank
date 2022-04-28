const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const db = require("../_db/index");

router.get("/:contest_id",
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                contest_id: Joi.string().required(),
            }).validate(req.params)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            const contestId = req.params.contest_id;

            const data = await models.contests.findByPk(contestId, {
                attributes: [
                    'id',
                    'total_teams',
                    'entry_fee',
                    'max_team',
                    'prize',
                    'is_confirmed',
                    'type',
                    'discount',
                    'bonus',
                    'prize_breakup',
                    [db.sequelize.literal(`(SELECT COUNT(*) FROM user_contests WHERE contest_id = contests.id)`), "total_joined"],
                    [db.sequelize.literal(`(SELECT IF(COUNT(*) = 0, false, true) FROM user_contests WHERE user_id = "${req.userId}" AND contest_id = contests.id)`), "has_joined"]
                ],
            });

            if (!data) {
                return res.json({
                    status: false,
                    message: 'Contest not found.',
                    data: null
                });
            }

            try {
                data.prize_breakup = JSON.parse(data.prize_breakup);
            } catch (e) {

            }

            for (const p of data.prize_breakup) {
                p.from = parseInt(p.from);
                p.to = parseInt(p.to);
                p.prize = parseInt(p.prize);
                p.percentage = parseFloat(p.percentage);
            }

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

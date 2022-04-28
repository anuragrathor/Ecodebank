const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const db = require("../_db/index");
const {Op} = require("sequelize");

router.get("/my",
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                fixture_id: Joi.number().required(),
            }).validate(req.query)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            const fixtureId = req.query.fixture_id ?? '';

            const contests = await models.private_contests.findAll({
                where: {
                    fixture_id: fixtureId,
                    id: {
                        [Op.in]: db.sequelize.literal(`(SELECT private_contest_id FROM user_private_contests as uc WHERE uc.user_id = "${req.userId}" AND uc.private_contest_id = private_contests.id)`)
                    },
                },
                include: [
                    {
                        model: models.user_private_contests,
                        as: 'user_private_contests',
                        attributes: ['id'],
                        include: [
                            {
                                model: models.user_teams,
                                as: 'user_team',
                                attributes: ['name']
                            }
                        ]
                    }
                ],
                attributes: [
                    'id',
                    'total_teams',
                    'entry_fee',
                    'max_team',
                    'prize',
                    'is_confirmed',
                    'winner_percentage',
                    'prize_breakup',
                    'invite_code',
                    [db.sequelize.literal(`(SELECT COUNT(*) FROM user_private_contests WHERE private_contest_id = private_contests.id)`), "total_joined"],
                    [db.sequelize.literal(`(SELECT SUM(prize) FROM user_private_contests WHERE private_contest_id = private_contests.id) AND user_private_contests.user_id = "${req.userId}"`), "winning_amount"],
                ],
            });

            const data = []
            for (let item of contests) {
                item = item.toJSON();
                item.user_contests = item.user_private_contests;
                try {
                    item.prize_breakup = JSON.parse(item.prize_breakup);
                } catch (e) {

                }

                for (const p of item.prize_breakup) {
                    p.from = parseInt(p.from);
                    p.to = parseInt(p.to);
                    p.prize = parseInt(p.prize);
                    p.percentage = parseFloat(p.percentage);
                }

                delete item.user_private_contests;
                data.push(item);
            }

            return res.json({
                status: true,
                message: null,
                data
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

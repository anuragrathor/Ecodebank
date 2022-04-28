const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const db = require("../_db/index");
const {Op} = require("sequelize");
router.get("/",
    async (req, res) => {
        try {
            // Validation
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

            const fixtureId = req.query.fixture_id ?? '';
            const contests = await models.contest_categories.findAll({
                include: [{
                    model: models.contests,
                    as: 'contests',
                    where: {
                        status: 'LIVE',
                        fixture_id: fixtureId,
                        [Op.and]: [
                            db.sequelize.literal('(SELECT COUNT(uc.id) FROM user_contests as uc WHERE uc.contest_id=contests.id) < contests.total_teams')
                        ]
                    },
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
                        'winner_percentage',
                        'prize_breakup',
                        'invite_code',
                        [db.sequelize.literal(`(SELECT COUNT(*) FROM user_contests WHERE contest_id = contests.id)`), "total_joined"],
                        [db.sequelize.literal(`(SELECT IF(COUNT(*) = 0, false, true) FROM user_contests WHERE user_id = "${req.userId}" AND contest_id = contests.id)`), "has_joined"]
                    ],
                }],
                attributes: ['id', 'name', 'tagline'],
            });

            const data = []
            for (let item of contests) {
                item = item.toJSON();
                item.type = item.contests.filter(c => c.type === 'FREE').length > 0 ? 'FREE' : 'PAID';
                for (const i of item.contests) {
                    i.has_joined = Boolean(i.has_joined).valueOf();
                    try {
                        i.prize_breakup = JSON.parse(i.prize_breakup);
                    } catch (e) {
                    }

                    for (const p of i.prize_breakup) {
                        p.from = parseInt(p.from);
                        p.to = parseInt(p.to);
                        p.prize = parseInt(p.prize);
                        p.percentage = parseFloat(p.percentage);
                    }
                }

                data.push(item);
            }

            return res.json({
                status: true,
                message: null,
                data
            });
        } catch (e) {
            console.log(e)
            return res.json({
                status: false,
                message: e.message,
                data: null
            });
        }
    });

module.exports = router;

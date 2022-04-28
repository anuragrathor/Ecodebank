const express = require('express');
const router = express.Router();
const adminModels = require("../_admin_models/index");
const Joi = require("joi");
const adminDb = require("../_db/admin");
const adminRedis = require("../_db/admin-redis");
const env = require("../_config/env");

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
            const usingOwnPaymentGateway = await adminRedis.sismember('merchant_own_payment_gateway', env.merchantId);
            const data = await adminModels.contests.findByPk(contestId, {
                where: {
                    is_special: usingOwnPaymentGateway === 1 ? 0 : [0, 1]
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
                    'prize_breakup',
                    [adminDb.sequelize.literal(`(SELECT COUNT(*) FROM user_contests WHERE contest_id = contests.id)`), "total_joined"],
                    [adminDb.sequelize.literal(`(SELECT IF(COUNT(*) = 0, false, true) FROM user_contests WHERE user_id = "${req.userId}" AND contest_id = contests.id)`), "has_joined"]
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

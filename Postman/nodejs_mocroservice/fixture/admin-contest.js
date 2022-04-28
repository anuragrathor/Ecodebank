const express = require('express');
const router = express.Router();
const Joi = require("joi");
const db = require("../_db/index");
const {Op} = require("sequelize");
const adminRedis = require("../_db/admin-redis");
const env = require("../_config/env");
const adminModels = require("../_admin_models/index");
const adminDb = require("../_db/admin");
router.get("/admin_contests",
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                fixture_id: Joi.required(),
            }).validate(req.query);

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                });
            }

            const fixtureId = schema.value.fixture_id;
            let merchantWallet = 9999999;

            const usingOwnPaymentGateway = await adminRedis.sismember('merchant_own_payment_gateway', env.merchantId);

            if (usingOwnPaymentGateway) {
                merchantWallet = await adminRedis.hget('merchant_wallet', env.merchantId);
            }

            const contests = await adminModels.contests.findAll({
                where: {
                    status: 'LIVE',
                    fixture_id: fixtureId,
                    [Op.and]: [
                        db.sequelize.literal('(SELECT COUNT(uc.id) FROM user_contests as uc WHERE uc.contest_id=contests.id) < contests.total_teams')
                    ],
                    entry_fee: {
                        [Op.lte]: merchantWallet
                    },
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
                    'winner_percentage',
                    'prize_breakup',
                    'invite_code',
                    [adminDb.sequelize.literal(`(SELECT COUNT(*) FROM user_contests WHERE contest_id = contests.id)`), "total_joined"],
                    [adminDb.sequelize.literal(`(SELECT IF(COUNT(*) = 0, false, true) FROM user_contests WHERE user_id = "${req.userId}" AND merchant_id = ${env.merchantId} AND contest_id = contests.id)`), "has_joined"]
                ],
            });

            const data = []
            for (let item of contests) {
                item = item.toJSON();
                item.has_joined = Boolean(item.has_joined).valueOf();
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

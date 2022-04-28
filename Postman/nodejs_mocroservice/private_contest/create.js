const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require('joi');
const otp = require('../_helpers/otp');
const uuid = require('uuid');
const env = require("../_config/env");
const kafka = require("../_db/kafka");
const kafkaConfig = require('../_config/kafka');
const db = require("../_db/index");
const redis = require("../_db/redis");
const {paymentCalculation} = require('../_helpers/common');
const Leaderboard = require("../_helpers/leaderboard");

router.post("/create", async (req, res) => {

    try {
        let setting = await models.settings.findOne({
            where: {
                key: 'private_contest'
            }
        });

        let settings = setting.value;

        try {
            settings = JSON.parse(setting.value);
        } catch (e) {
        }
        // Validation
        const schema = Joi.object({
            fixture_id: Joi.number().required(),
            contest_name: Joi.string().required(),
            total_teams: Joi.number().min(parseInt(settings.min_contest_size)).max(parseInt(settings.max_contest_size)).required(),
            entry_fee: Joi.number().min(parseInt(settings.min_entry_fee)).max(parseInt(settings.max_entry_fee)).required(),
            max_team: Joi.number().min(parseInt(settings.min_allow_multi)).max(parseInt(settings.max_allow_multi)).required(),
            contest_flexible: Joi.allow(null).required(),
            rank_id: Joi.number().required(),
            user_team_id: Joi.string().required(),
        }).validate(req.body);

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const data = schema.value;

        //fixture condition check
        const fixtureData = await models.fixtures.findByPk(data.fixture_id, {where: {is_active: 1}});
        if (!fixtureData) {
            return res.json({
                status: false,
                message: 'Match not found.',
                data: null
            });
        }

        if (fixtureData.status !== 'NOT STARTED') {
            return res.json({
                status: false,
                message: 'Match ' + fixtureData.status,
                data: null
            });
        }

        const userTeam = await models.user_teams.findOne({
            where: {
                id: data.user_team_id,
                fixture_id: data.fixture_id,
                user_id: req.userId
            }
        });

        if (!userTeam) {
            return res.json({
                status: false,
                message: 'Invalid request.',
                data: null
            });
        }

        let rankCategory = null;

        let total = 0;
        if (settings.commission_on_fee <= data.entry_fee) {
            total = (data.total_teams * data.entry_fee) - ((data.total_teams * data.entry_fee) * parseInt(settings.commission_value) / 100);
        } else {
            total = data.total_teams * data.entry_fee;
        }

        if (data.rank_id > 0) {
            rankCategory = await models.rank_categories.findByPk(data.rank_id, {
                include: [
                    {
                        as: 'ranks',
                        model: models.ranks,
                        attributes: ['rank', 'from', 'to', 'percentage']
                    }
                ]
            });
            rankCategory = rankCategory.toJSON();
        } else if (data.rank_id == 0) {
            rankCategory = {
                winner: 1,
                ranks: [{rank: "1", from: 1, to: 1, percentage: 100}]
            };
        }

        if (!rankCategory) {
            return res.json({
                status: false,
                message: 'Invalid request.',
                data: null
            });
        }

        for (let r of rankCategory.ranks) {
            r.amount = Math.floor(total * r.percentage / 100);
        }

        if (rankCategory.winner > data.total_teams) {
            return res.json({
                status: false,
                message: 'Invalid request.',
                data: null
            });
        }

        let lastWinner = 0;
        let prize_breakups = [];
        let totalPrize = total;

        rankCategory.ranks.map((res, key) => {
            lastWinner = res.to;
            prize_breakups.push({
                rank: res.rank,
                from: res.from,
                to: res.to,
                percentage: res.percentage,
                prize: res.amount
            });
        });

        data.prize_breakup = prize_breakups;
        // Check balance
        const user = await models.users.findByPk(req.userId);

        if ((+user.balance) < +(data.entry_fee)) {
            return res.json({
                status: false,
                message: 'You do not have sufficient balance to join this contest.',
                data: null
            });
        }

        data['commission'] = (data.entry_fee * data.total_teams) - totalPrize;

        if (data.max_team === 0) {
            data.max_team = 1;
        }

        data['prize'] = totalPrize;
        data['status'] = 'LIVE';
        data['user_id'] = req.userId;
        data['invite_code'] = 'P' + otp.generate(7, {digits: true, alphabets: true, upperCase: true});
        data['prize_breakup'] = JSON.stringify(data.prize_breakup);
        data['winner_percentage'] = (100 * lastWinner) / data.total_teams
        data['is_confirmed'] = data.contest_flexible;
        data['created_at'] = new Date();

        delete data['contest_flexible'];
        data['id'] = uuid.v4();

        await db.sequelize.transaction(async () => {

            const paymentData = await paymentCalculation(parseInt(user.cash_bonus), parseInt(user.winning_amount), parseInt(user.deposited_balance), data.entry_fee, 'PRIVATE', 0, 0).then();
            let TotalPay = Math.round(((paymentData.wining_amount + paymentData.cash_bonus + paymentData.deposited_balance)) * 100) / 100;
            if (TotalPay < data.entry_fee) {
                return res.json({
                    status: false,
                    message: 'You do not have sufficient balance to join this contest.',
                    data: null
                });
            }

            //send kafka to super admin
            let updates = await models.private_contests.create(data);
            updates = updates.toJSON();
            updates['merchant_id'] = env.merchantId;

            const remainingTeams = updates.total_teams - 1;
            await redis.set(`contestSpace:${updates.id}`, remainingTeams.toString());

            await kafka.sendMessage(kafkaConfig.adminTopic, [{type: 'updatePrivateContest', data: updates}]);

            //cash_bonus,wining_amount,deposited_balance,entry_fee

            let userPrivateContest = await models.user_private_contests.create({
                id: uuid.v4(),
                user_id: req.userId,
                private_contest_id: updates.id,
                user_team_id: data.user_team_id,
                payment_data: JSON.stringify(paymentData),
                created_at: new Date()
            });


            userPrivateContest = userPrivateContest.toJSON();

            //send kafka to super admin
            userPrivateContest['merchant_id'] = env.merchantId;

            await kafka.sendMessage(kafkaConfig.adminTopic, [{
                type: 'updateJoinPrivateContest',
                data: userPrivateContest
            }]);

            const transactionId = 'CJN'
                + new Date().getTime().toString()
                + otp.generate(2, {
                    upperCase: true,
                    digits: false
                });

            let payment = await models.payments.create({
                user_id: req.userId,
                private_contest_id: updates.id,
                amount: -(updates.entry_fee),
                status: 'SUCCESS',
                transaction_id: transactionId,
                description: 'Joined a Private contest',
                type: 'CONTEST JOIN',
                created_at: new Date()
            });

            //send kafka to super admin
            payment = payment.toJSON();
            payment['merchant_id'] = env.merchantId;

            await kafka.sendMessage(kafkaConfig.adminTopic, [{
                type: 'updatePrivatePayment',
                data: payment
            }]);

            if (paymentData) {
                await user.decrement({cash_bonus: paymentData.cash_bonus});
                await user.decrement({deposited_balance: paymentData.deposited_balance});
                await user.decrement({winning_amount: paymentData.wining_amount});
                await user.decrement({balance: (paymentData.wining_amount + paymentData.deposited_balance + paymentData.cash_bonus)});
            }

            await user.reload();
            //send kafka to super admin
            await kafka.sendMessage(kafkaConfig.adminTopic, [{
                type: 'updateUser',
                data: {
                    merchant_id: env.merchantId,
                    id: user.id,
                    balance: user.balance,
                    winning_amount: user.winning_amount,
                    deposited_balance: user.deposited_balance,
                    cash_bonus: user.cash_bonus
                }
            }]);

            const lb = new Leaderboard('leaderboard:' + updates.id);

            lb.rankMember(data.user_team_id, 0, JSON.stringify({
                id: user.id,
                username: user.username,
                photo: user.photo,
                prevRank: 0,
                private: false,
                teamName: userTeam.name
            }));
        });

        await redis.sadd(`fixtureReminder:${data.fixture_id}`, req.userId);

        return res.json({
            status: true,
            message: 'Contest Created.',
            data: null
        });

    } catch (e) {
        return res.json({
            status: false,
            message: e.message,
            data: null
        });
    }
});


module.exports = router;

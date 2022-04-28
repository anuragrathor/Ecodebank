const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const otp = require('../_helpers/otp');
const db = require("../_db/index");
const env = require("../_config/env");
const kafka = require("../_db/kafka");
const redis = require("../_db/redis");
const kafkaConfig = require('../_config/kafka');
const {paymentCalculation, checkLevel} = require('../_helpers/common');
const Leaderboard = require("../_helpers/leaderboard");

router.post("/join",
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                contest_id: Joi.string().required(),
                user_team_id: Joi.string().required(),
            }).validate(req.body)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            const data = schema.value;

            const key = 'contestSpace:' + data.contest_id;
            let spaceAvailable = parseInt(await redis.get(key));

            if (!spaceAvailable) {
                return res.json({
                    status: false,
                    message: 'Contest not found.',
                    data: null
                });
            }

            if (spaceAvailable < 0) {
                return res.json({
                    status: false,
                    message: 'Contest full.',
                    data: null
                });
            }

            // Get contest with fixture
            let contest = await models.contests.findOne({
                where: {
                    id: data.contest_id,
                    status: 'LIVE'
                },
                include: [{
                    model: models.fixtures,
                    as: 'fixture',
                }],
                attributes: ['id', 'fixture_id', 'total_teams', 'entry_fee', 'max_team', 'prize', 'is_confirmed', 'type', 'discount', 'bonus']
            });

            if (!contest) {
                return res.json({
                    status: false,
                    message: 'Contest not found.',
                    data: null
                });
            }

            contest = contest.toJSON();

            if (contest.fixture.status !== 'NOT STARTED' || !contest.fixture.is_active) {
                return res.json({
                    status: false,
                    message: 'Match started or completed.',
                    data: null
                });
            }

            // Check all user teams exists for fixture
            const userTeam = await models.user_teams.findOne({
                where: {
                    id: data.user_team_id,
                    fixture_id: contest.fixture_id,
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

            // Get count of joined contest of current user
            const joinedContests = await models.user_contests.count({
                where: {
                    contest_id: data.contest_id,
                    user_id: req.userId
                },
            });

            // Max team validation
            if ((joinedContests + 1) > parseInt(contest.max_team)) {
                return res.json({
                    status: false,
                    message: `You can not join more than ${contest.max_team} team(s).`,
                    data: null
                });
            }

            // Get count of joined contest by any user team id
            const joinedContestsByTeam = await models.user_contests.count({
                where: {
                    contest_id: data.contest_id,
                    user_team_id: data.user_team_id,
                    user_id: req.userId
                },
            });

            // Max team validation
            if (joinedContestsByTeam > 0) {
                return res.json({
                    status: false,
                    message: `Contest has already been joined by any of your requested team.`,
                    data: null
                });
            }

            // Get count of joined contest of all
            const joined = await models.user_contests.count({
                where: {
                    contest_id: data.contest_id,
                },
            });

            // Validate against remaining spot
            const remaining = parseInt(contest.total_teams) - joined;

            if (1 > remaining) {
                return res.json({
                    status: false,
                    message: `You can only join with ${remaining} team(s).`,
                    data: null
                });
            }

            // Check balance
            const user = await models.users.findByPk(req.userId);
            if (contest.type !== 'FREE' && contest.type !== 'PRACTICE') {
                if ((+user.balance) < (contest.entry_fee)) {
                    return res.json({
                        status: false,
                        message: 'You do not have sufficient balance to join this contest.',
                        data: null
                    });
                }
            }

            spaceAvailable = await redis.DECR(key);

            if (spaceAvailable < 0) {
                return res.json({
                    status: false,
                    message: 'Contest full.',
                    data: null
                });
            }

            if (spaceAvailable === 0) {
                const res = await redis.sadd(`autoCreateContest`, data.contest_id);
                if (res === 1) {
                    await kafka.sendMessage(kafkaConfig.merchantTopic, [{
                        type: 'createContest',
                        data: {contest_id: contest.id, merchant_id: env.merchantId}
                    }])
                }
            }

            try {
                //cash_bonus,wining_amount,deposited_balance,entry_fee
                var paymentData = await paymentCalculation(parseInt(user.cash_bonus), parseInt(user.winning_amount), parseInt(user.deposited_balance), contest.entry_fee, contest.type, contest.discount, contest.bonus).then();

                if (contest.type !== 'FREE' && contest.type !== 'PRACTICE') {
                    if (contest.discount > 0 && contest.type === 'DISCOUNT') {
                        let perCentage = ((contest.entry_fee * contest.discount) / 100);
                        contest.entry_fee = contest.entry_fee - perCentage;
                    }
                    let TotalPay = Math.round(((paymentData.wining_amount + paymentData.cash_bonus + paymentData.deposited_balance)) * 100) / 100;
                    if (TotalPay < contest.entry_fee) {
                        return res.json({
                            status: false,
                            message: 'You do not have sufficient balance to join this contest.',
                            data: null
                        });
                    }
                } else {
                    paymentData = {cash_bonus: 0, wining_amount: 0, deposited_balance: 0};
                }

                await db.sequelize.transaction(async () => {

                    await models.user_contests.create({
                        user_id: req.userId,
                        contest_id: data.contest_id,
                        user_team_id: data.user_team_id,
                        payment_data: JSON.stringify(paymentData),
                        created_at: new Date()
                    });

                    const transactionId = 'CJN'
                        + new Date().getTime().toString()
                        + otp.generate(2, {
                            upperCase: true,
                            digits: false
                        });

                    if (contest.type !== 'FREE' && contest.type !== 'PRACTICE') {

                        let payment = {
                            user_id: req.userId,
                            contest_id: data.contest_id,
                            amount: -(paymentData.wining_amount + paymentData.deposited_balance + paymentData.cash_bonus),
                            status: 'SUCCESS',
                            transaction_id: transactionId,
                            description: 'Joined a contest',
                            type: 'CONTEST JOIN',
                            created_at: new Date()
                        };

                        await models.payments.create(payment);

                        payment['merchant_id'] = env.merchantId;
                        await kafka.sendMessage(kafkaConfig.adminTopic, [{
                            type: 'updatePayment',
                            data: payment
                        }]);
                    }

                    if (paymentData) {
                        await user.decrement({cash_bonus: paymentData.cash_bonus});
                        await user.decrement({deposited_balance: paymentData.deposited_balance});
                        await user.decrement({winning_amount: paymentData.wining_amount});
                        await user.decrement({balance: (paymentData.wining_amount + paymentData.deposited_balance + paymentData.cash_bonus)});
                    }

                    await checkLevel(req.userId).then();
                    // user.save();

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

                    return true;
                });

                const lb = new Leaderboard('leaderboard:' + data.contest_id);
                lb.rankMember(data.user_team_id, 0, JSON.stringify({
                    id: user.id,
                    username: user.username,
                    photo: user.photo,
                    prevRank: 0,
                    private: false,
                    teamName: userTeam.name
                }));

            } catch (e) {
                console.error(e);
                await redis.INCR(key);
                return res.json({
                    status: false,
                    message: e.message,
                    data: null
                });
            }

            await redis.sadd(`fixtureReminder:${contest.fixture_id}`, req.userId);

            return res.json({
                status: true,
                message: 'Contest joined.',
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

const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const adminModels = require("../_admin_models/index");
const Joi = require("joi");
const otp = require('../_helpers/otp');
const db = require("../_db/index");
const adminDb = require("../_db/admin");
const env = require("../_config/env");
const kafka = require("../_db/kafka");
const adminRedis = require("../_db/admin-redis");
const kafkaConfig = require('../_config/kafka');
const {paymentCalculation, checkLevel} = require('../_helpers/common');
const Leaderboard = require("../_helpers/leaderboard");
const redis = require("../_db/redis");

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

            const user = await models.users.findByPk(req.userId);


            if (!user.document_verified || !user.email_verified || !user.phone_verified) {
                return res.json({
                    status: false,
                    message: 'Please verify you account.',
                    data: null
                });
            }

            const key = 'contestSpace:' + data.contest_id;
            let spaceAvailable = await adminRedis.get(key);

            if (!spaceAvailable) {
                return res.json({
                    status: false,
                    message: 'Contest not found.',
                    data: null
                });
            }

            spaceAvailable = parseInt(spaceAvailable);

            if (spaceAvailable < 0) {
                return res.json({
                    status: false,
                    message: 'Contest full.',
                    data: null
                });
            }

            let merchantWallet = 9999999;
            const usingOwnPaymentGateway = await adminRedis.sismember('merchant_own_payment_gateway', env.merchantId);

            if (usingOwnPaymentGateway) {
                merchantWallet = await adminRedis.hget('merchant_wallet', env.merchantId);
            }

            // Get contest with fixture
            let contest = await adminModels.contests.findOne({
                where: {
                    id: data.contest_id,
                    status: 'LIVE',
                    is_special: usingOwnPaymentGateway === 1 ? 0 : [0, 1]
                },
                include: [{
                    model: adminModels.fixtures,
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


            if (merchantWallet < contest.entry_fee) {
                return res.json({
                    status: false,
                    message: 'You can\'t join now, Please contact to admin',
                    data: null
                });
            }

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
                    user_id: req.userId,
                    // merchant_id: env.merchantId
                }
            });

            if (!userTeam) {
                return res.json({
                    status: false,
                    message: 'Invalid team.',
                    data: null
                });
            }

            // Get count of joined contest of current user
            const joinedContests = await adminModels.user_contests.count({
                where: {
                    contest_id: data.contest_id,
                    user_id: req.userId,
                    merchant_id: env.merchantId
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
            const joinedContestsByTeam = await adminModels.user_contests.count({
                where: {
                    contest_id: data.contest_id,
                    user_team_id: data.user_team_id,
                    user_id: req.userId,
                    merchant_id: env.merchantId
                },
            });

            // Max team validation
            if (joinedContestsByTeam > 0) {
                return res.json({
                    status: false,
                    message: `Contest has already been joined this team.`,
                    data: null
                });
            }

            // Get count of joined contest of all
            const joined = await adminModels.user_contests.count({
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

            if (contest.type !== 'FREE' && contest.type !== 'PRACTICE') {
                if ((+user.balance) < +(contest.entry_fee)) {
                    return res.json({
                        status: false,
                        message: 'You do not have sufficient balance to join this contest.',
                        data: null
                    });
                }
            }

            if (await adminRedis.sismember('merchant_own_payment_gateway', env.merchantId)) {
                merchantWallet = await adminRedis.hincrby('merchant_wallet', env.merchantId, -(contest.entry_fee));

                if (merchantWallet < 0) {
                    return res.json({
                        status: false,
                        message: 'You can\'t join now, Please contact to admin',
                        data: null
                    });
                }
            }

            spaceAvailable = await adminRedis.DECR(key);

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
                    await kafka.sendMessage(kafkaConfig.adminTopic, [{
                        type: 'createContest',
                        data: {contest_id: contest.id}
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

                    let totalPay = Math.round(((paymentData.wining_amount + paymentData.cash_bonus + paymentData.deposited_balance)) * 100) / 100;

                    if (totalPay < contest.entry_fee) {
                        return res.json({
                            status: false,
                            message: 'You do not have sufficient balance to join this contest.',
                            data: null
                        });
                    }

                } else {
                    paymentData = {cash_bonus: 0, wining_amount: 0, deposited_balance: 0};
                }

                const userContestData = {
                    user_id: req.userId,
                    contest_id: data.contest_id,
                    user_team_id: data.user_team_id,
                    payment_data: JSON.stringify(paymentData),
                    created_at: new Date(),
                    merchant_id: env.merchantId
                };

                await adminDb.sequelize.transaction(async () => {
                    await adminModels.user_contests.create(userContestData);
                });

                await db.sequelize.transaction(async () => {
                    await models.admin_user_contests.create({
                        user_id: req.userId,
                        contest_id: data.contest_id,
                        user_team_id: data.user_team_id,
                        payment_data: JSON.stringify(paymentData),
                        created_at: new Date(),
                    });
                });

                await db.sequelize.transaction(async () => {
                    const transactionId = 'CJN'
                        + new Date().getTime().toString()
                        + otp.generate(2, {
                            upperCase: true,
                            digits: false
                        });

                    if (contest.type !== 'FREE' && contest.type !== 'PRACTICE') {
                        const payment = {
                            user_id: req.userId,
                            admin_contest_id: data.contest_id,
                            amount: -(paymentData.wining_amount + paymentData.deposited_balance + paymentData.cash_bonus),
                            status: 'SUCCESS',
                            transaction_id: transactionId,
                            description: 'Joined a contest',
                            type: 'CONTEST JOIN',
                            created_at: new Date()
                        }

                        await models.payments.create(payment);

                        payment['merchant_id'] = env.merchantId;
                        await kafka.sendMessage(kafkaConfig.adminTopic, [{
                            type: 'updatePayment',
                            data: payment
                        }])
                    }

                    if (paymentData) {
                        await user.decrement({cash_bonus: paymentData.cash_bonus});
                        await user.decrement({deposited_balance: paymentData.deposited_balance});
                        await user.decrement({winning_amount: paymentData.wining_amount});
                        await user.decrement({balance: (paymentData.wining_amount + paymentData.deposited_balance + paymentData.cash_bonus)});
                    }

                    await checkLevel(req.userId).then();

                    await user.reload();
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

                const lb = new Leaderboard('leaderboard:' + data.contest_id, null, true);

                lb.rankMember(data.user_team_id, 0, JSON.stringify({
                    id: user.id,
                    username: user.username,
                    photo: user.photo,
                    prevRank: 0,
                    private: true,
                    teamName: userTeam.name
                }));

            } catch (e) {
                console.error(e);
                if (await adminRedis.sismember('merchant_own_payment_gateway', env.merchantId)) {
                    await adminRedis.hincrby('merchant_wallet', env.merchantId, contest.entry_fee)
                }
                await adminRedis.INCR(key);

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

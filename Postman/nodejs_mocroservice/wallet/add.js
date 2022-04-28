const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const {Pay} = require('../_helpers/rozarpay');
const Joi = require('joi');
const kafka = require("../_db/kafka");
const kafkaConfig = require('../_config/kafka');
const env = require('../_config/env')
const db = require("../_db/index");
const moment = require("moment/moment");
router.post("/add", async (req, res) => {

    try {
        // Validation
        const schema = Joi.object({
            amount: Joi.string().required(),
            payment_id: Joi.string().required(),
            coupon: Joi.optional(),
        }).validate(req.body)

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const data = schema.value;

        if (!data.hasOwnProperty('coupon')) {
            data.coupon = null;
        }

        var isExist = await models.payments.count({
            where: {
                reference_id: data.payment_id
            }
        });

        let user = await models.users.findOne({
            where: {
                id: req.userId
            }
        });

        if (isExist > 0) {
            return res.json({
                status: false,
                message: 'Payment received.',
                data: {'balance': user.balance}
            });
        }

        const Razorpay = await Pay().then();

        if (!Razorpay) {
            return res.json({
                status: false,
                message: 'Please contact administrator.',
                data: null
            });
        }

        const payments = await Razorpay.payments.fetch(data.payment_id);

        if (payments) {
            if (payments.notes.id && payments.status === 'authorized' && payments.notes.id.toString() === req.userId.toString()) {

                const captures = await Razorpay.payments.capture(data.payment_id, data.amount * 100, 'INR');

                if (!captures) {
                    return res.json({
                        status: false,
                        message: 'Invalid Request.',
                        data: null
                    });
                }

                await db.sequelize.transaction(async () => {
                    const couponDetail = await getCashback(data.coupon, data.amount, req.userId);
                    let cashbackMain = 0;
                    let couponData;
                    if (couponDetail.status) {
                        const cashback = couponDetail.data.cashback;

                        if (couponDetail.data.type === 'MAIN') {
                            cashbackMain = cashback;
                        } else {
                            user.cash_bonus = parseFloat(user.cash_bonus) + parseFloat(cashback);
                        }

                        couponData = {
                            coupon_id: couponDetail.data.coupon_id,
                            reference_id: null,
                            user_id: req.userId,
                            amount: cashback,
                            status: 'SUCCESS',
                            transaction_id: 'TXN' + Math.floor(Math.random() * 1000000000),
                            description: 'Cashback',
                            type: 'DEPOSIT',
                            created_at: new Date()
                        };
                    }

                    user.balance = parseFloat(user.balance) + parseFloat(data.amount);
                    user.deposited_balance = parseFloat(user.deposited_balance) + parseFloat(data.amount) + cashbackMain;
                    await user.save();

                    await kafka.sendMessage(kafkaConfig.adminTopic, [{
                        type: 'updateUser',
                        data: {
                            merchant_id: env.merchantId,
                            id: user.id,
                            balance: user.balance,
                            deposited_balance: user.deposited_balance
                        }
                    }]);

                    let paymentData = {
                        reference_id: data.payment_id,
                        user_id: req.userId,
                        amount: data.amount,
                        status: 'SUCCESS',
                        transaction_id: 'TXN' + Math.floor(Math.random() * 1000000000),
                        description: 'Deposit',
                        type: 'DEPOSIT',
                        created_at: new Date()
                    };

                    await models.payments.create(paymentData);

                    paymentData['merchant_id'] = env.merchantId;
                    await kafka.sendMessage(kafkaConfig.adminTopic, [{
                        type: 'updatePayment',
                        data: paymentData
                    }]);

                    if (couponData) {
                        await models.payments.create(couponData);

                        couponData['merchant_id'] = env.merchantId;
                        await kafka.sendMessage(kafkaConfig.adminTopic, [{
                            type: 'updatePayment',
                            data: couponData
                        }]);
                    }
                });

            } else if (payments.captured) {
                return res.json({
                    status: true,
                    message: 'Amount deposited successfully.',
                    data: null
                });
            }
        } else {
            return res.json({
                status: false,
                message: 'Invalid Request.',
                data: null
            });
        }

        return res.json({
            status: true,
            message: 'Amount deposited successfully.',
            data: null
        });
    } catch (e) {
        console.error(e);
        if (e.hasOwnProperty('error')) {
            if (e.error.hasOwnProperty('description')) {
                return res.json({
                    status: false,
                    message: e.error.description,
                    data: null
                });
            }
        }

        return res.json({
            status: false,
            message: e.message,
            data: null
        });
    }
});

router.post("/coupon", async (req, res) => {
    // Validation
    const schema = Joi.object({
        code: Joi.string().required(),
        amount: Joi.number().required(),
    }).validate(req.body)

    if (schema.error) {
        return res.json({
            status: false,
            message: schema.error.message,
            data: null
        });
    }

    const data = schema.value;

    return res.send(await getCashback(data.code, data.amount, req.userId))
});

async function getCashback(code, amount, userId) {
    try {
        if (code) {
            let coupon = await models.coupons.findOne({
                where: {
                    code,
                    is_active: 1
                }
            });

            if (coupon) {
                coupon = coupon.toJSON();

                const maxAllowedCashback = coupon.max_cashback;
                let cashback = parseInt(amount * coupon.cashback_percentage / 100);

                if (cashback > maxAllowedCashback) {
                    cashback = maxAllowedCashback;
                }

                if (coupon.usage_limit > 0) {
                    const paymentsCount = await models.payments.count({
                        where: {
                            coupon_id: coupon.id
                        }
                    });

                    if (paymentsCount >= coupon.usage_limit) {
                        return {
                            status: false,
                            message: `Code expired.`,
                            data: null
                        };
                    }

                    if (moment(coupon.expire_at).isBefore()) {
                        return {
                            status: false,
                            message: `Code expired.`,
                            data: null
                        };
                    }
                }

                if (coupon.limit_per_user > 0) {
                    const paymentsCount = await models.payments.count({
                        where: {
                            coupon_id: coupon.id,
                            user_id: userId
                        }
                    });

                    if (paymentsCount >= coupon.limit_per_user) {
                        return {
                            status: false,
                            message: `Code has already been used.`,
                            data: null
                        };
                    }
                }

                if (amount < coupon.min_amount) {
                    return {
                        status: false,
                        message: `Minimum amount should be ${coupon.min_amount} to apply this code.`,
                        data: null
                    };
                } else {
                    return {
                        status: true,
                        message: `Coupon code applied successfully. ${cashback} will be added once you complete this payment.`,
                        data: {
                            cashback,
                            type: coupon.wallet_type,
                            coupon_id: coupon.id
                        }
                    };
                }
            }
        }

        return {
            status: false,
            message: 'Invalid coupon code',
            data: null
        };
    } catch (e) {
        return {
            status: false,
            message: e.message,
            data: null
        };
    }
}

module.exports = router;

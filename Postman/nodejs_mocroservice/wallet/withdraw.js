const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require('joi');
const env = require("../_config/env");
const kafka = require("../_db/kafka");
const kafkaConfig = require("../_config/kafka");

router.post("/withdraw", async (req, res) => {
    var setting = await models.settings.findOne({
        where: {
            key: 'withdraw'
        }
    });
    let withdraw_settings = setting.value;
    try {
        withdraw_settings = JSON.parse(setting.value);
    } catch (e) {

    }
    // Validation
    const schema = Joi.object({
        amount: Joi.number().integer().min(withdraw_settings.min_amount).max(withdraw_settings.max_amount).required()
    }).validate(req.body);

    if (schema.error) {
        return res.json({
            status: false,
            message: schema.error.message,
            data: null
        });
    }
    const data = schema.value;

    //user amount check
    let user = await models.users.findOne({
        where: {
            id: req.userId
        }
    });

    if (data.amount > user.winning_amount) {
        return res.json({
            status: false,
            message: 'You do not have sufficient balance to withdraw money.',
            data: null
        });
    }
    //pending payment check
    let payment = await models.payments.count({
        where: {
            user_id: req.userId,
            status: 'PENDING',
            type: 'WITHDRAW'
        }
    });

    if (payment > 0) {
        return res.json({
            status: false,
            message: 'Withdrawal request already pending.',
            data: null
        });
    }

    //get bank details
    let bank = await models.bank_accounts.findOne({
        where: {
            user_id: req.userId
        }
    });

    //check bank and bank status
    if (!bank) {
        return res.json({
            status: false,
            message: 'Please update your bank account details.',
            data: null
        });
    } else if (bank.status === 'PENDING') {
        return res.json({
            status: false,
            message: 'Your bank account details are not verified.',
            data: null
        });
    }

    let transaction_id = 'WTH' + Math.floor(Math.random() * 1000000000);

    //create withdraw request
    let paymentData = {
        user_id: req.userId,
        amount: -(data.amount),
        status: 'PENDING',
        transaction_id: transaction_id,
        description: 'Withdrawal Pending',
        type: 'WITHDRAW',
        created_at: new Date()
    };

    let p = await models.payments.create(paymentData);
    p = p.toJSON();

    await kafka.sendMessage(kafkaConfig.merchantTopic, [{
        type: 'autoWithdraw',
        data: {merchant_id: env.merchantId, payment_id: p.id}
    }]);

    paymentData['merchant_id'] = env.merchantId;
    await kafka.sendMessage(kafkaConfig.adminTopic, [{
        type: 'updatePayment',
        data: paymentData
    }]);

    await user.decrement({winning_amount: Math.abs(paymentData.amount)});
    await user.decrement({balance: Math.abs(paymentData.amount)});

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

    return res.json({
        status: true,
        message: 'Your withdrawal request has been received.',
        data: null
    });
});

router.get("/withdraw/settings", async (req, res) => {
    var settings = await models.settings.findOne({
        where: {
            key: 'withdraw'
        }
    });

    if (!settings) {
        return res.json({
            status: false,
            message: 'Please contact administrator',
            data: null
        });
    }

    let withdraw = settings.dataValues.value;

    try {
        withdraw = JSON.parse(withdraw);
    } catch (e) {
    }

    return res.json({
        status: true,
        message: null,
        data: withdraw
    });

    return res.json({
        status: true,
        message: 'Your withdrawal request has been received.',
        data: null
    });
});

module.exports = router;

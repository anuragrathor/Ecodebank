const express = require('express');
const router = express.Router();
const models = require("../_models/index");


router.get("/invite", async (req, res) => {
    try {
        let userId = req.userId;
        const user = await models.users.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.json({
                status: false,
                message: 'Invalid request.',
                data: null
            });
        }

        const invitedUsers = await models.users.findAll({
            where: {
                referral_id: userId
            },
            attributes: ['id', 'username', 'photo', 'is_deposit', 'referral_amount', 'referral_pending_amount']
        });

        return res.json({
            status: true,
            message: null,
            data: invitedUsers
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

router.get("/invite/share", async (req, res) => {
    try {
        let userId = req.userId;
        const user = await models.users.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.json({
                status: false,
                message: 'Invalid request.',
                data: null
            });
        }

        const invitedUsers = await models.users.count({
            where: {
                referral_id: userId
            }
        });

        const settings = await models.settings.findOne({
            where: {
                key: 'referral_price'
            }
        });
        let referral_amount = 0;
        if (settings.value) {
            referral_amount = settings.value;
        }

        let inviteText = 'Get up to ' + referral_amount + ' in Cash Bonuses and gift your friend discounts worth ' + referral_amount + ' for registering and playing with us!';
        let shareText = 'Get up to ' + referral_amount + ' in Cash Bonuses and gift your friend discounts worth ' + referral_amount + ' for registering and playing with us!';

        return res.json({
            status: true,
            message: null,
            data: {
                invite_code: user.referral_code,
                invite_description: inviteText,
                invite_joined: invitedUsers,
                share_description: shareText
            }
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

router.get("/invite/contest", async (req, res) => {
    try {
        let userId = req.userId;
        const user = await models.users.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.json({
                status: false,
                message: 'Invalid request.',
                data: null
            });
        }

        const invitedUsers = await models.users.count({
            where: {
                referral_id: userId
            }
        });

        const settings = await models.settings.findOne({
            where: {
                key: 'referral_price'
            }
        });
        let referral_amount = 0;
        if (settings.value) {
            referral_amount = settings.value;
        }

        let inviteText = 'Get up to ' + referral_amount + ' in Cash Bonuses and gift your friend discounts worth ' + referral_amount + ' for registering and playing with us!';
        let shareText = 'Get up to ' + referral_amount + ' in Cash Bonuses and gift your friend discounts worth ' + referral_amount + ' for registering and playing with us!';

        return res.json({
            status: true,
            message: null,
            data: {
                invite_code: user.referral_code,
                invite_description: inviteText,
                invite_joined: invitedUsers,
                share_description: shareText
            }
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

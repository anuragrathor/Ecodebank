const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const path = require('../path');

router.get("/", async (req, res) => {
    let pan = await models.pan_cards.findOne({
        where: {
            user_id: req.userId
        }
    });
    if (pan) {
        pan = pan.toJSON();
        //image full path 
        pan['photo_full_path'] = 'file:///' + path.rootPath + path.public_path + pan.photo;
    }
    let bank = await models.bank_accounts.findOne({
        where: {
            user_id: req.userId
        }
    });
    if (bank) {
        bank = bank.toJSON();
        //image full path 
        bank['photo_full_path'] = 'file:///' + path.rootPath + path.public_path + bank.photo;
    }
    let email = await models.users.findOne({
        attributes: ['id', 'email', 'email_verified'],
        where: {
            id: req.userId
        }
    });

    let phone = await models.users.findOne({
        attributes: ['id', 'phone', 'phone_verified'],
        where: {
            id: req.userId
        }
    });

    return res.json({
        status: true,
        message: null,
        data: {
            pan: pan,
            bank: bank,
            email: email,
            phone: phone
        }
    });
});

module.exports = router;

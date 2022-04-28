const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require('joi');
const uploadFile = require("../_helpers/upload");
var fs = require('fs');
const path = require('../path');

router.get("/bank", async (req, res) => {
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
    return res.json({
        status: true,
        message: null,
        data: {
            bank: bank
        }
    });
});

router.post("/bank", async (req, res) => {
    req.validFileExt = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];
    try {
        await uploadFile(req, res);

        if (req.fileError) {
            return res.json({
                status: false,
                message: req.fileError,
                data: null
            })
        }

        if (!req.file) {
            return res.json({
                status: false,
                message: 'Please upload bank passbook image.',
                data: null
            })
        }

        const states = await models.states.findAll({attributes: ['id']});
        // Validation
        const schema = Joi.object({
            name: Joi.string().required(),
            account_number: Joi.string().required(),
            branch: Joi.string().required(),
            ifsc_code: Joi.string().required(),
            state_id: Joi.number().allow(states.map(el => el.id).toString())
        }).validate(req.body)

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const data = schema.value;
        data['photo'] = req.file.location
        data['status'] = 'PENDING';
        data['user_id'] = req.userId;
        data['created_at'] = new Date();

        var bank = await models.bank_accounts.findOne({
            where: {
                user_id: req.userId
            }
        });
        let user = await models.users.findOne({
            where: {
                id: req.userId
            }
        });

        if (!bank) {
            await models.bank_accounts.create(data);
        } else {
            if (user.bank_update_count === 3) {
                return res.json({
                    status: false,
                    message: 'You\'ve already reached bank detailed update requests limit. Contact to the admin.',
                    data: null
                });
            }

            Object.assign(bank, data);
            await bank.save();
        }

        return res.json({
            status: true,
            message: 'Bank details submitted successfully.',
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

router.get("/bank/unlink", async (req, res) => {
    let bank = await models.bank_accounts.findOne({
        where: {
            user_id: req.userId
        }
    });

    let user = await models.users.findOne({
        where: {
            id: req.userId
        }
    });
    if (bank) {

        let payments = await models.payments.count({
            where: {
                user_id: req.userId,
                status: 'PENDING',
                type: 'WITHDRAW'
            }
        });
        if (payments > 0) {
            return res.json({
                status: false,
                message: 'Bank Account Not Unlinked. You have pending withdraw request',
                data: null
            });
        }
        let banks = bank.toJSON();
        var filePath = path.rootPath + '/public/uploads/' + banks.photo;

        try {
            fs.unlinkSync(filePath);
        } catch (e) {
            console.error(e);
            return res.json({
                status: true,
                message: 'Bank Account Unlinked successfully.',
                data: null
            });
        }
    }


    return res.json({
        status: true,
        message: 'Bank Account Unlinked successfully.',
        data: null
    });
});

module.exports = router;

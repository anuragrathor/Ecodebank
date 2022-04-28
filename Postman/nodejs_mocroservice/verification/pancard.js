const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require('joi');
const uploadFile = require("../_helpers/upload");
var fs = require('fs');
const path = require('../path');

router.post("/pan-card", async (req, res) => {
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
                message: 'Upload bank passbook image',
                data: null
            })
        }
        // Validation
        const schema = Joi.object({
            name: Joi.string().required(),
            pan_number: Joi.string().length(10).required(),
            date_of_birth: Joi.string().required(),
        }).validate(req.body)

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const data = schema.value;

        var panExistUser = await models.pan_cards.count({
            where: {
                pan_number: data.pan_number,
                is_verified: 1,
                status: 'VERIFIED'
            }
        });

        if (panExistUser) {
            return res.json({
                status: false,
                message: 'Pan card Already Assign to other User.',
                data: null
            });
        }


        data['photo'] = req.file.location
        data['status'] = 'PENDING';
        data['user_id'] = req.userId;
        data['created_at'] = new Date();

        var panExist = await models.pan_cards.count({
            where: {
                user_id: req.userId,
                is_verified: 1,
                status: 'VERIFIED'
            }
        });

        if (panExist) {
            var filePath = path.rootPath + '/public/uploads/' + req.file.filename;
            try {
                fs.unlinkSync(filePath);
            } catch (e) {
                console.error(e);
            }
            return res.json({
                status: true,
                message: 'Pan card Already Verified.',
                data: null
            });
        } else {

            var pan = await models.pan_cards.findOne({
                where: {
                    user_id: req.userId
                }
            });

            if (!pan) {
                await models.pan_cards.create(data);
            } else {
                var filePath = path.rootPath + '/public/uploads/' + pan.photo;
                Object.assign(pan, data);
                await pan.save();
            }

            try {
                fs.unlinkSync(filePath);
            } catch (e) {
                console.error(e);
                return res.json({
                    status: true,
                    message: 'Pan card details submitted successfully.',
                    data: null
                });
            }

            return res.json({
                status: true,
                message: 'Pan card details submitted successfully.',
                data: null
            });
        }

    } catch (e) {
        console.error(e);
        return res.json({
            status: false,
            message: e.message,
            data: null
        });
    }

});

router.get("/pan-card", async (req, res) => {
    try {
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
        return res.json({
            status: true,
            message: null,
            data: {
                pan: pan
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

const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const uploadFile = require("../_helpers/upload");

router.post("/profile_picture", async (req, res) => {
    req.validFileExt = ['png', 'jpg','jpeg','PNG','JPG','JPEG'];
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
                message: 'Upload profile picture image',
                data: null
            })
        }

        let user = await models.users.findOne({
            where: {
                id: req.userId
            }
        });

        if (!user) {
            return res.json({
                status: false,
                message: "Invalid User",
                data: null
            });
        } else {
            let filePath = req.file.location;
            Object.assign(user, {photo:req.file.location,updated_at:new Date()});
            await user.save();

            return res.json({
                status: true,
                message: 'User profile picture updated successfully.',
                data: {
                    photo: filePath
                }
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

module.exports = router;

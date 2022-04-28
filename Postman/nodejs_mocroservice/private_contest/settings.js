const express = require('express');
const router = express.Router();
const models = require("../_models/index");

router.get("/settings", async (req, res) => {

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


        return res.json({
            status: true,
            message: null,
            data: settings
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

const express = require('express');
const router = express.Router();
const adminModels = require("../_admin_models/index");
router.get("/setting",
    async (req, res) => {
        try {
            const settings = await adminModels.settings.findOne({where: {key: 'teams'}});

            if (!settings) {
                return res.json({
                    status: false,
                    message: 'Please contact administrator',
                    data: null
                });
            }

            let team = settings.dataValues.value;

            try {
                team = JSON.parse(team);
            } catch (e) {
            }

            return res.json({
                status: true,
                message: null,
                data: team
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

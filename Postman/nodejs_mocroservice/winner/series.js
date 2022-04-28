const express = require('express');
const router = express.Router();
const models = require("../_models/index");

router.get("/series",
    async (req, res) => {


        try {
            const series = await models.competitions.findAll({
                attributes: ['id', 'title']
            });

            return res.json({
                status: true,
                message: null,
                data: series
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

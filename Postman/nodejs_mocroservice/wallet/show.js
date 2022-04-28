const express = require('express');
const router = express.Router();
const models = require("../_models/index");

router.get("/",
    async (req, res) => {
        const data = {};

        return res.json({
            status: true,
            message: null,
            data: data
        });
    });

module.exports = router;

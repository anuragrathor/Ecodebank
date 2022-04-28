const express = require('express');
const router = express.Router();
const redis = require("../_db/redis");

router.get("/version", async (req, res) => {
    try {
        let version = JSON.parse(await redis.get('version'));
        if (version) {
            return res.json({
                status: true,
                message: null,
                data: version
            });
        } else {
            return res.json({
                status: false,
                message: 'Please contact administrator.',
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

module.exports = router;

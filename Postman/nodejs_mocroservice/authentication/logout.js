const express = require('express');
const router = express.Router();
const redis = require("../_db/redis");
router.get("/logout",
    async (req, res) => {
        try {
            if (req.token) {
                await redis.del("auth:" + req.token);
            }
            return res.json({
                status: true,
                message: 'Logout successfully.',
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

module.exports = router;

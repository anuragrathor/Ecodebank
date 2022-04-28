const express = require('express');
const router = express.Router();
const models = require("../_models/index");

router.get("/history", async (req, res) => {

    const data = await models.payments.findAll({
        where: {
            user_id: req.userId
        },
        raw: true
    });

    for (let p of data) {
        const amount = parseInt(p.amount);
        p.amount = amount < 0 ? `- ₹${Math.abs(amount)}` : `+ ₹${Math.abs(amount)}`
    }

    return res.json({
        status: true,
        message: null,
        data: data
    });
});

module.exports = router;

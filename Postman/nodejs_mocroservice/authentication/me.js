const express = require('express');
const router = express.Router();
const models = require("../_models/index");

router.get("/me", async (req, res) => {
    try {
        let userId = req.userId;
        const user = await models.users.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.json({
                status: false,
                message: 'Invalid request',
                data: null
            });
        }

        const data = user.toJSON();
        delete data.password;
        delete data.verification_code;
        delete data.remember_token;

        return res.json({
            status: true,
            message: null,
            data: data
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

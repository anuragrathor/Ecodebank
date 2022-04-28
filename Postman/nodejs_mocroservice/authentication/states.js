const express = require('express');
const router = express.Router();
const models = require("../_models/index");

router.get("/states", async (req, res) => {
    try {

        let states = await models.states.findAll({});

        return res.json({
            status: true,
            message: null,
            data: states
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

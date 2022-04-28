const express = require('express');
const router = express.Router();
const models = require("../_models/index");

router.get("/banner", async (req, res) => {
    try {

        let banner = await models.banners.findAll({
            where:{
                is_active:true
            }
        });

        return res.json({
            status: true,
            message: null,
            data: banner
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

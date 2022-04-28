const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require('joi');
const {Op} = require("sequelize");

router.post("/ranks", async (req, res) => {
    try {
        // Validation
        const schema = Joi.object({
            total_teams: Joi.number().required(),
            entry_fee: Joi.number().required(),
        }).validate(req.body);

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }
        const data = schema.value;

        let setting = await models.settings.findOne({
            where: {
                key: 'private_contest'
            }
        });
        let settings = JSON.parse(setting.value);
        let total = 0; 
        
        if(settings.commission_on_fee < data.entry_fee){
            total = (data.total_teams * data.entry_fee)-((data.total_teams * data.entry_fee)*parseInt(settings.commission_value)/100);
        }else{
            total = data.total_teams * data.entry_fee;
        }
        
        var ranks = await models.rank_categories.findAll({
            where: {
                winner: {
                    [Op.lte]: data.total_teams
                }
            },
            include: [{
                model: models.ranks,
                as: 'ranks',
                attributes: ['rank', 'from', 'to', 'percentage']
            }]
        });

        const response = [];
        for (let c of ranks) {
            c = c.toJSON();
            for (let r of c.ranks) {
                r.amount = Math.floor(total * r.percentage / 100);
            }
            response.push(c);
        }

        return res.json({
            status: true,
            message: null,
            data: response
        });
    } catch (e) {
        return res.json({
            status: false,
            message: e.message,
            data: null
        });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Joi = require("joi");
const Leaderboard = require('../_helpers/leaderboard');
const models = require("../_models/index");
const adminModels = require("../_admin_models/index");
router.post('/my',
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                contest_id: Joi.string().required(),
                type: Joi.string().required().valid('user', 'admin', 'merchant')
            }).validate(req.body);

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                });
            }

            const contestId = schema.value.contest_id;
            const type = schema.value.type;

            let teamsIds = [];

            if (type === 'user') {
                teamsIds = await models.user_private_contests.findAll({
                    where: {user_id: req.userId, private_contest_id: contestId},
                    attributes: ['user_team_id']
                });
            } else if (type === 'admin') {
                teamsIds = await adminModels.user_contests.findAll({
                    where: {user_id: req.userId, contest_id: contestId},
                    attributes: ['user_team_id']
                });
            } else {
                teamsIds = await models.user_contests.findAll({
                    where: {user_id: req.userId, contest_id: contestId},
                    attributes: ['user_team_id']
                });
            }

            if (teamsIds.length === 0) {
                return res.json({
                    status: true,
                    message: null,
                    data: []
                });
            }

            const lb = new Leaderboard('leaderboard:' + contestId, null, type === 'admin');

            lb.rankedInList(teamsIds.map(el => el.user_team_id), {withMemberData: true}, function (data) {
                return res.json({
                    status: true,
                    message: null,
                    data: data
                });
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

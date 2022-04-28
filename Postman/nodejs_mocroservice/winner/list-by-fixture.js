const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const adminModels = require("../_models/index");
const Leaderboard = require("../_helpers/leaderboard");
const Joi = require("joi");

router.get("/by-fixture",
    async (req, res) => {

        const schema = Joi.object({
            fixture_id: Joi.number().required(),
            contest_id: Joi.string().required(),
            type: Joi.string().valid('merchant', 'admin')
        }).validate(req.query);

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const contestId = schema.value.contest_id;
        const type = schema.value.type;

        try {
            let contest;
            if (type === 'merchant') {
                contest = await models.contests.findByPk(contestId, {
                    where: {
                        is_mega_contest: 1
                    }
                });
            } else {
                contest = await adminModels.contests.findByPk(contestId, {
                    where: {
                        is_mega_contest: 1
                    }
                });
            }

            if (!contest) {
                return res.json({
                    status: false,
                    message: 'Invalid request',
                    data: null
                });
            }

            const lb = new Leaderboard('leaderboard:' + contestId, null, type === 'admin');
            // const lb = new Leaderboard('leaderboard:' + 10, null);

            lb.membersFromRankRange(1, 10, {withMemberData: true}, (e) => {
                return res.json({
                    status: true,
                    message: null,
                    data: e
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

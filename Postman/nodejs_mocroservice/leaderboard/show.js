const express = require('express');
const router = express.Router();
const Joi = require("joi");
const Leaderboard = require('../_helpers/leaderboard');

router.post('/',
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                contest_id: Joi.string().required(),
                page: Joi.number().greater(0).required(),
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
            const page = schema.value.page;

            // Dummy data
            // const lb1 = new Leaderboard('leaderboard:' + 10);
            // const members = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
            // for (const m of members) {
            //     lb1.rankMember(m, Math.floor(Math.random() * 1000), JSON.stringify({
            //         id: (members.indexOf(m) + 1),
            //         username: m,
            //         prevRank: 0,
            //         photo: null,
            //         private: false
            //     }));
            // }

            const lb = new Leaderboard('leaderboard:' + contestId, null, type === 'admin');

            lb.leaders(page, {withMemberData: true}, function (data) {
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

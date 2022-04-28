const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const db = require("../_db");
const Leaderboard = require('../_helpers/leaderboard');

router.get('/:contest_id',
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                contest_id: Joi.string().required(),
            }).validate(req.params);

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                });
            }

            const contestId = schema.value.contest_id;

            const lb = new Leaderboard('leaderboard:' + contestId);
            lb.totalPages(lb.pageSize, function (data) {
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

const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const adminModels = require("../_admin_models/index");
const moment = require("moment/moment");
router.post("/share_contest",
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
            let contest;
            if (type === 'user') {
                contest = await models.private_contests.findByPk(contestId, {
                    include: [{
                        model: models.fixtures,
                        as: 'fixture',
                    }],
                });
            } else if (type === 'admin') {
                contest = await adminModels.contests.findByPk(contestId, {
                    include: [{
                        model: adminModels.fixtures,
                        as: 'fixture',
                    }],
                });
            } else {
                contest = await models.contests.findByPk(contestId, {
                    include: [{
                        model: models.fixtures,
                        as: 'fixture',
                    }],
                });
            }

            if (!contest) {
                return res.json({
                    status: false,
                    message: 'Contest not found.',
                    data: null
                });
            }

            contest = contest.toJSON();

            let description = `I have challenged you to a ₹${contest.prize} contest for the ${contest.fixture.teama} vs ${contest.fixture.teamb} match!`;

            description += `\nEntry: ₹${contest.entry_fee}`;
            description += `\nSpots: ${contest.total_teams}`;
            if (contest.hasOwnProperty('type')) {
                if (contest.type !== 'PRACTICE') {
                    description += `\n1st Prize: ₹${contest.prize_breakup[0].prize}`;
                }
            }
            description += `\nDeadline: ${moment(contest.fixture.starting_at).format('DD MMM, h:mm A')}`;
            description += `\nUse contest code ${contest.invite_code}`;

            return res.json({
                status: true,
                message: null,
                data: description
            });
        } catch (e) {
            console.log(e)
            return res.json({
                status: false,
                message: e.message,
                data: null
            });
        }
    });

module.exports = router;

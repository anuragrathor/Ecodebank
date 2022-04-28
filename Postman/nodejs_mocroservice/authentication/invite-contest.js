const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const adminModels = require("../_admin_models/index");
const Joi = require("joi");

router.post("/invite-contest", async (req, res) => {
    try {
        // Validation
        const schema = Joi.object({
            invite_code: Joi.string().required(),
        }).validate(req.body)

        const code = schema.value.invite_code;

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }
        let contest;
        let type;
        if (code.startsWith('A')) {
            contest = await adminModels.contests.findOne({where: {invite_code: code}});
            type = 'admin';
        } else if (code.startsWith('P')) {
            contest = await models.private_contests.findOne({where: {invite_code: code}});
            type = 'private';
        } else if (code.startsWith('M')) {
            contest = await models.contests.findOne({where: {invite_code: code}});
            type = 'merchant';
        }

        if (!contest) {
            return res.json({
                status: false,
                message: 'The unique invitation code looks invalid! Please check again.',
                data: null
            });
        }

        return res.json({
            status: true,
            message: null,
            data: {contest_id: contest.id, type, fixture_id: contest.fixture_id}
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

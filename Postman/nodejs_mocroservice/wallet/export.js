const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const adminModels = require("../_admin_models/index");
var pdf = require("pdf-creator-node");
const Joi = require('joi');
const {Op} = require("sequelize");
const {sendMail, emailLayout} = require('../_helpers/mail');
var fs = require("fs");
const moment = require("moment/moment");
router.post("/export", async (req, res) => {

    try {
        // Validation
        const schema = Joi.object({
            from: Joi.required(),
            to: Joi.required()
        }).validate(req.body);

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const params = schema.value;

        const payments = await models.payments.findAll({
            where: {
                user_id: req.userId,
                created_at: {
                    [Op.between]: [moment(params.from).startOf('day'), moment(params.to).endOf('day')]
                }
            },
            include: [
                {
                    model: models.contests,
                    as: 'contest',
                    attributes: [
                        'fixture_id'
                    ],
                    include: [{
                        model: models.fixtures,
                        as: 'fixture',
                        attributes: [
                            'name',
                            'competition_name',
                            'starting_at'
                        ]
                    }],
                },
                {
                    model: models.private_contests,
                    as: 'private_contest',
                    attributes: [
                        'fixture_id'
                    ],
                    include: [{
                        model: models.fixtures,
                        as: 'fixture',
                        attributes: [
                            'name',
                            'competition_name',
                            'starting_at'
                        ]
                    }],
                },
            ],
        });

        const adminContestIds = payments.map(p => p.toJSON()).filter(p => p.admin_contest_id).map(p => p.admin_contest_id);

        const adminContests = await adminModels.contests.findAll({
            where: {
                id: adminContestIds
            },
            attributes: [
                'id',
                'fixture_id'
            ],
            include: [{
                model: adminModels.fixtures,
                as: 'fixture',
                attributes: [
                    'name',
                    'competition_name',
                    'starting_at'
                ]
            }],
        })

        let data = [];

        for (const p of payments) {
            let tour = '';
            let fixture = '';

            if (p.contest_id) {
                const dts = new Date(p.contest.fixture.starting_at);
                const dF = (dts.getDate() + "-" + (dts.getMonth() + 1) + "-" + dts.getFullYear());
                tour = p.contest.fixture.competition_name;
                fixture = p.contest.fixture.name + " (" + dF + ")";
            } else if (p.private_contest_id) {
                const dts = new Date(p.private_contest.fixture.starting_at);
                const dF = (dts.getDate() + "-" + (dts.getMonth() + 1) + "-" + dts.getFullYear());
                tour = p.private_contest.fixture.competition_name;
                fixture = p.private_contest.fixture.name + " (" + dF + ")";
            } else if (p.admin_contest_id) {
                p.admin_contest = adminContests.map(a => a.toJSON()).find(a => a.id === p.admin_contest_id);
                const dts = new Date(p.admin_contest.fixture.starting_at);
                const dF = (dts.getDate() + "-" + (dts.getMonth() + 1) + "-" + dts.getFullYear());
                tour = p.admin_contest.fixture.competition_name;
                fixture = p.admin_contest.fixture.name + " (" + dF + ")";
            }

            data.push({
                transaction_id: p.transaction_id,
                created_at: p.created_at,
                tour,
                round: fixture,
                amount: p.amount,
                description: p.description
            });
        }

        const user = await models.users.findByPk(req.userId);

        var htmlTemplate = fs.readFileSync(process.cwd() + "/wallet/walletTemplate.html", "utf8");

        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">DQOT APP</div>'
            },
        };
        var document = {
            html: htmlTemplate,
            data: {
                transactions: data,
            },
            type: "stream",
        };


        pdf.create(document, options).then((pdf) => {
            let content = "<h3>  Export Transaction </h3>";
            let html = emailLayout(user.email, content);
            sendMail(user.email, 'Find Attachment!', html, user.email, pdf.path);
            return res.json({
                status: true,
                message: 'Attachment send to your email',
                data: null
            });
        }).catch((error) => {
            console.error(error);
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

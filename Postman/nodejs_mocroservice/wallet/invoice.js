const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const adminModels = require("../_admin_models/index");
var pdf = require("pdf-creator-node");
const paths = require('../path');
const Joi = require('joi');
const otp = require('../_helpers/otp');
const {inWords} = require('../_helpers/common');
const {Op} = require("sequelize");
var fs = require("fs");

router.get("/invoice", async (req, res) => {

    try {
        // Validation
        const schema = Joi.object({
            transaction_id: Joi.required()
        }).validate(req.query);
        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }
        const params = schema.value;

        let payment = await models.payments.findOne({
            where: {
                user_id: req.userId,
                transaction_id: params.transaction_id,
                type: 'CONTEST JOIN'
            }
        });

        if (!payment) {
            return res.json({
                status: false,
                message: 'Transaction not found.',
                data: null
            });
        }

        let contest;

        if (payment.contest_id) {
            contest = await models.contests.findOne({
                where: {
                    id: payment.contest_id,
                }
            });

        } else if (payment.private_contest_id) {
            contest = await models.private_contests.findOne({
                where: {
                    id: payment.private_contest_id,
                }
            });
        } else if (payment.admin_contest_id) {
            contest = await adminModels.contests.findOne({
                where: {
                    id: payment.admin_contest_id,
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

        let user = await models.users.findOne({
            where: {
                id: req.userId,
            }
        });

        if (!user) {
            return res.json({
                status: false,
                message: 'Invalid request',
                data: null
            });
        }

        user = user.toJSON();

        const invoiceId = 'IN' + payment.id;

        var htmlTemplate = fs.readFileSync(process.cwd() + "/wallet/invoiceTemplate.html", "utf8");

        // var htmlTemplate = fs.readFileSync("invoiceTemplate.html", "utf8");

        var dd = new Date(payment.created_at);
        let invoice_date = dd.getFullYear() + '-' + (dd.getMonth() + 1) + '-' + dd.getDate();
        let amount_in_word = await inWords(Math.abs(payment.amount)).then();
        let commission = contest.commission;
        let mainAmount = Math.abs(payment.amount) - commission;

        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">DQOT Technologies Private Limited</div>'
            },
        };

        const document = {
            html: htmlTemplate,
            data: {
                name: user.username,
                email: user.email,
                compnay: 'DQOT Technologies Private Limited',
                terms_condition_url: 'www.sitename.com/cricket/termsandconditions',
                invoice_id: invoiceId,
                transaction_id: payment.transaction_id,
                description: payment.description,
                total_amount: parseFloat(Math.abs(payment.amount)).toFixed(2),
                invoice_date: invoice_date,
                amount_in_word: amount_in_word,
                commission: parseFloat(commission).toFixed(2),
                main_amount: parseFloat(mainAmount).toFixed(2)
            },
            type: "stream",
        };

        pdf.create(document, options).then((data) => {
            fs.readFile(data.path, function (err, f) {
                res.contentType("application/pdf");
                res.send(f);
            });
        }).catch((error) => {
            console.error(error);
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

const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require('joi');
const db = require("../_db/index");
const redis = require("../_db/redis");

router.get("/verify-email", async (req, res) => {
    // Validation
    try {

        const schema = Joi.object({
            token: Joi.string().required(),
            email: Joi.string().email().required(),
        }).unknown(true).validate(req.query)

        if (schema.error) {
            return res.send('Invalid request.');
        }

        const data = schema.value;
        const key = 'verify:' + data.email;
        const token = await redis.get(key);

        if (token === data.token) {

            var user = await models.users.findOne({
                where: {
                    email: data.email,
                }
            });


            if (user) {
                if (user.email_verified === 1) {
                    return res.send('Your email has already been verified.');
                }

                await db.sequelize.transaction(async () => {
                    user.remember_token = null;
                    user.verification_code = null;
                    user.email_verified = 1;
                    await user.save();

                    await redis.del(key);
                });

                return res.send('Your email has been verified.');

            }

        }

        return res.send('Invalid request.');

    } catch (e) {
        console.error(e);
        return res.send('Invalid request.');
    }

});

module.exports = router;


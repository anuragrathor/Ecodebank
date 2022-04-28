const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const db = require("../_db");
const Leaderboard = require("../_helpers/leaderboard");
const Joi = require("joi");

router.get("/",
    async (req, res) => {

        const schema = Joi.object({
            series_id: Joi.number().optional().allow(''),
            page: Joi.number().greater(0).required()
        }).validate(req.query);

        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }

        const page = schema.value.page;
        const limit = 10;
        const offset = (page - 1) * limit;
        const seriesId = schema.value.series_id;

        try {
            const query = "SELECT f.id,f.name,f.teama,f.teama_image,f.teamb,f.teamb_image,f.starting_at,c.prize,c.id as contest_id FROM fixtures AS f " +
                "JOIN contests AS c " +
                "ON f.id = " +
                "(SELECT fixture_id FROM contests WHERE fixture_id = f.id LIMIT 1) " +
                "AND " +
                "c.id = (SELECT id FROM contests WHERE fixture_id = f.id ORDER BY prize DESC LIMIT 1)" +
                `${seriesId ? ' WHERE f.competition_id = ' + seriesId : ''} LIMIT :limit OFFSET :offset`;

            const fixtures = await db.sequelize.query(query, {
                model: models.fixtures,

                replacements: {
                    limit,
                    offset,
                },
            });

            const data = []
            for (let f of fixtures) {
                f = f.toJSON();
                f.owner = 'merchant';
                f.winners = await getRankData(f.contest_id)
                // f.winners = await getRankData('10')
                data.push(f);
            }

            return res.json({
                status: true,
                message: null,
                data: data
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

async function getRankData(leaderboardId) {
    const lb = new Leaderboard('leaderboard:' + leaderboardId);

    return new Promise((resolve => {
        lb.membersFromRankRange(1, 5, {withMemberData: true}, (e) => resolve(e));
    }))

}

module.exports = router;

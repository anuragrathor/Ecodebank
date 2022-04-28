const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const moment = require("moment/moment");
const db = require("../_db");
const redis = require("../_db/redis");

router.get("/",
    async (req, res) => {

        try {
            const query = "SELECT fixtures.*," +
                "(SELECT COUNT(*) FROM contests WHERE contests.fixture_id=fixtures.id AND contests.status = 'LIVE') as contests_count " +
                "FROM fixtures " +
                "WHERE EXISTS (SELECT 1 FROM squads WHERE fixtures.id = squads.fixture_id) AND is_active = :is_active AND status IN (:status) AND starting_at > :starting_at " +
                "ORDER BY starting_at ASC";
            const data = await db.sequelize.query(query, {
                replacements: {
                    is_active: 1,
                    status: ['NOT STARTED'],
                    starting_at: moment.now()
                },
                model: models.fixtures
            });

            const response = [];
            for (let d of data) {
                d = d.toJSON();
                d.fixture_reminder = !!(await redis.sismember(`fixtureReminder:${d.id}`, req.userId));
                d.series_reminder = !!(await redis.sismember(`seriesReminder:${d.id}`, req.userId));

                response.push(d);
            }

            return res.json({
                status: true,
                message: null,
                data: response
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

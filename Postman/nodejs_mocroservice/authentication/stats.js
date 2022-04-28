const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const adminModels = require("../_admin_models/index");
const db = require("../_db");
const adminDb = require("../_db/admin");
const Joi = require("joi");

router.get("/stats", async (req, res) => {
    try {

        let userId = req.userId;

        let totalContest = await models.user_contests.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: models.contests,
                    as: 'contest',
                    include: [
                        {
                            model: models.fixtures,
                            as: 'fixture',
                        }
                    ]
                }
            ],
        });

        let totalPrivateContest = await models.user_private_contests.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: models.private_contests,
                    as: 'private_contest',
                    include: [
                        {
                            model: models.fixtures,
                            as: 'fixture',
                        }
                    ]
                }
            ],
        });

        let totalAdminContest = await adminModels.user_contests.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: adminModels.contests,
                    as: 'contest',
                    include: [
                        {
                            model: adminModels.fixtures,
                            as: 'fixture',
                        }
                    ]
                }
            ],
        });

        let totalMatches = [];
        let totalSeries = [];
        let totalWinContest = [];

        if (totalContest.length > 0) {
            totalContest.map(async (el) => {
                if (totalMatches.indexOf(el.contest.fixture_id) == -1) {
                    totalMatches.push(el.contest.fixture_id);
                }
                if (totalSeries.indexOf(el.contest.fixture.competition_id) == -1) {
                    totalSeries.push(el.contest.fixture.competition_id);
                }
                if (el.prize) {
                    if (totalWinContest.indexOf(el.contest_id) == -1) {
                        totalWinContest.push(el.contest_id);
                    }
                }
            });
        }
        if (totalPrivateContest.length > 0) {
            totalPrivateContest.map((el) => {
                if (totalMatches.indexOf(el.private_contest.fixture_id) == -1) {
                    totalMatches.push(el.private_contest.fixture_id);
                }
                if (totalSeries.indexOf(el.private_contest.fixture.competition_id) == -1) {
                    totalSeries.push(el.private_contest.fixture.competition_id);
                }
                if (el.prize) {
                    if (totalWinContest.indexOf(el.private_contest_id) == -1) {
                        totalWinContest.push(el.private_contest_id);
                    }
                }
            });
        }
        if (totalAdminContest.length > 0) {
            totalAdminContest.map((el) => {
                if (totalMatches.indexOf(el.contest.fixture_id) == -1) {
                    totalMatches.push(el.contest.fixture_id);
                }
                if (totalSeries.indexOf(el.contest.fixture.competition_id) == -1) {
                    totalSeries.push(el.contest.fixture.competition_id);
                }
                if (el.prize) {
                    if (totalWinContest.indexOf(el.contest_id) == -1) {
                        totalWinContest.push(el.contest_id);
                    }
                }
            });
        }

        let totalJoinedContest = (totalContest.length + totalPrivateContest.length + totalAdminContest.length);
        let totalWinRate = 0;

        if (totalWinContest.length > 0 && totalJoinedContest > 0) {
            totalWinRate = parseInt((totalWinContest.length / totalJoinedContest) * 100);
        }

        let user_stats = {
            total_matches: totalMatches.length,
            total_series: totalSeries.length,
            total_sports: 1,
            total_joined_contest: totalJoinedContest,
            total_win_contest: totalWinContest.length,
            total_win_rate: totalWinRate,
            playing_since: req.user.created_at
        }

        return res.json({
            status: true,
            message: null,
            data: user_stats
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

router.get("/recent_matches", async (req, res) => {
    try {
        const schema = Joi.object({
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
        let userId = req.userId;

        const query = "select fixtures.*,(SELECT SUM(total_points) FROM squads WHERE fixture_id = fixtures.id ORDER BY total_points DESC LIMIT 11) as dream_team_points, " +
            "(select count(*) from user_teams where fixture_id = fixtures.id and user_teams.user_id = :user_id) as total_teams, " +
            "(select total_points from user_teams where fixture_id = fixtures.id and user_teams.user_id = :user_id and total_points=(SELECT MAX(total_points) FROM user_teams where fixture_id = fixtures.id and user_teams.user_id = :user_id) LIMIT 1) as total_points , " +
            "(select name as team_name from user_teams where fixture_id = fixtures.id and user_teams.user_id = :user_id and total_points=(SELECT MAX(total_points) FROM user_teams where fixture_id = fixtures.id and user_teams.user_id = :user_id) LIMIT 1) as team_name from fixtures " +
            "where id in (select fixture_id from user_teams join user_contests on user_contests.user_team_id = user_teams.id where user_contests.user_id = (:user_id) and user_teams.fixture_id = fixtures.id) " +
            "or id in (select fixture_id from user_teams join user_private_contests on user_private_contests.user_team_id = user_teams.id where user_private_contests.user_id = (:user_id) and user_teams.fixture_id = fixtures.id) " +
            "or id in (select fixture_id from user_teams join admin_user_contests on admin_user_contests.user_team_id = user_teams.id where admin_user_contests.user_id = (:user_id) and user_teams.fixture_id = fixtures.id) " +
            "LIMIT :limit OFFSET :offset";

        const data = await db.sequelize.query(query, {
            replacements: {
                user_id: userId,
                limit,
                offset
            },
            model: models.fixtures
        });

        for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
            data.push({
                "id": 50372,
                "name": "Sri Lankan Lions VS Black Caps",
                "competition_id": 121573,
                "competition_name": "ECS Cyprus T10",
                "teama": "Sri Lankan Lions",
                "teama_id": "116489",
                "teama_image": "https://cricket.entitysport.com/assets/uploads/2021/09/Sri-Lankan-Linos.png",
                "teama_score": "114/2 (10 ov)",
                "teama_short_name": "SLL",
                "teamb": "Black Caps",
                "teamb_id": "121574",
                "teamb_image": "https://cricket.entitysport.com/assets/uploads/2021/09/Black-Cops.png",
                "teamb_score": "86/7 (10 ov)",
                "teamb_short_name": "BCP",
                "format": "17",
                "format_str": "T10",
                "starting_at": "2021-09-28T21:30:00.000Z",
                "verified": true,
                "pre_squad": true,
                "is_active": true,
                "lineup_announced": true,
                "status": "COMPLETED",
                "status_note": "Sri Lankan Lions won by 28 runs.",
                "last_squad_update": "2021-09-28T21:16:57.000Z",
                "mega_value": 50,
                "created_at": "2021-09-28T13:15:08.000Z",
                "updated_at": "2021-09-28T23:50:51.000Z",
                "dream_team_points": "561.00",
                "total_teams": 1,
                "total_points": "0.00",
                "team_name": "T1"
            })
        }

        return res.json({
            status: true,
            message: null,
            data: data.slice((offset), page * 10)
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

const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const redis = require("../_db/redis");

router.get("/:fixture_id/players",
    async (req, res) => {

        try {
            // Validation
            const schema = Joi.object({
                fixture_id: Joi.number().required(),
            }).validate(req.params)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            const fixtureId = schema.value.fixture_id;

            const data = await models.squads.findAll({
                where: {
                    fixture_id: fixtureId
                },
                include: [
                    {
                        model: models.players,
                        as: 'player',
                    },
                    {
                        model: models.fixtures,
                        as: 'fixture',
                    }
                ],
            });

            const players = [];

            // selected by
            const selectedByFixture = await redis.ZREVRANGE(`selectedByFixture:${fixtureId}`, 0, -1, 'WITHSCORES');
            const selectedPlayers = selectedByFixture.reduce(function (a, c, i) {
                var idx = i / 2 | 0;
                if (i % 2) {
                    a[idx].score = c;
                } else {
                    a[idx] = {id: parseInt(c)};
                }

                return a;
            }, []);

            // selected by captain
            const captainSelectedByFixture = await redis.ZREVRANGE(`captainSelectedByFixture:${fixtureId}`, 0, -1, 'WITHSCORES');
            const selectedPlayersByCaptain = captainSelectedByFixture.reduce(function (a, c, i) {
                var idx = i / 2 | 0;
                if (i % 2) {
                    a[idx].score = c;
                } else {
                    a[idx] = {id: parseInt(c)};
                }

                return a;
            }, []);

            // selected by vice captain
            const viceCaptainSelectedByFixture = await redis.ZREVRANGE(`viceCaptainSelectedByFixture:${fixtureId}`, 0, -1, 'WITHSCORES');
            const selectedPlayersByViceCaptain = viceCaptainSelectedByFixture.reduce(function (a, c, i) {
                var idx = i / 2 | 0;
                if (i % 2) {
                    a[idx].score = c;
                } else {
                    a[idx] = {id: parseInt(c)};
                }

                return a;
            }, []);

            const totalTeamCount = await models.user_teams.count({where: {fixture_id: fixtureId}});

            for (let squad of data) {
                squad = squad.toJSON();
                squad.team = squad.team_id.toString() === squad.fixture.teama_id.toString() ? squad.fixture.teama_short_name : squad.fixture.teamb_short_name;
                const player = squad.player;
                delete squad.player;
                delete squad.fixture;

                const p = selectedPlayers.find(el => el.id === squad.player_id);
                let selectedBy = 0;
                if (p) {
                    selectedBy = (100 * p.score) / totalTeamCount;
                }

                const c = selectedPlayersByCaptain.find(el => el.id === squad.player_id);
                let selectedByCaptain = 0;
                if (c) {
                    selectedByCaptain = (100 * c.score) / totalTeamCount;
                }

                const v = selectedPlayersByViceCaptain.find(el => el.id === squad.player_id);
                let selectedByViceCaptain = 0;
                if (v) {
                    selectedByCaptain = (100 * v.score) / totalTeamCount;
                }

                players.push({
                    ...squad,
                    ...player,
                    ...{selectedBy},
                    ...{selectedByCaptain},
                    ...{selectedByViceCaptain}
                });
            }

            return res.json({
                status: true,
                message: null,
                data: players
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

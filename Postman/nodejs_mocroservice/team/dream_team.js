const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");

router.post("/dreamteam",
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                fixture_id: Joi.number().required()
            }).validate(req.body)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            const fixtureId = schema.value.fixture_id;

            const fixture = await models.fixtures.findOne({
                where: {
                    id: fixtureId
                }
            });

            if (!fixture) {
                return res.json({
                    status: false,
                    message: 'Match not found',
                    data: null
                });
            }


            const squads = await models.squads.findAll({
                where: {
                    fixture_id: fixtureId,
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
                limit: 11,
                order: [
                    ['total_points', 'DESC']
                ],
            });

            const players = [];
            let totalPoints = 0;
            for (let squad of squads) {
                const index = squads.indexOf(squad);
                squad = squad.toJSON();
                squad.team = squad.team_id.toString() === squad.fixture.teama_id.toString() ? squad.fixture.teama_short_name : squad.fixture.teamb_short_name;
                totalPoints += parseFloat(squad.total_points);
                const player = squad.player;
                delete squad.player;
                delete squad.fixture;
                players.push({
                    ...squad,
                    ...player,
                    is_captain: index === 0,
                    is_vice_captain: index === 1,
                });
            }

            const data = {
                name: 'Dream Team',
                points: totalPoints,
                teama: fixture.teama_short_name,
                teama_count: players.filter(el => el.team_id.toString() === fixture.teama_id.toString()).length,
                teamb: fixture.teamb_short_name,
                teamb_count: players.filter(el => el.team_id.toString() === fixture.teamb_id.toString()).length,
                wicket_keepers: players.filter(el => el.role === 'WK'),
                batsmen: players.filter(el => el.role === 'BAT'),
                all_rounders: players.filter(el => el.role === 'AR'),
                bowlers: players.filter(el => el.role === 'BOWL')
            }

            return res.json({
                status: true,
                message: null,
                data
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

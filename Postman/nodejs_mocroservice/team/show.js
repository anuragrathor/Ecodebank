const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const {query} = require("winston");

router.get("/:team_id",
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                team_id: Joi.string().required(),
            }).validate(req.params)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }
            const teamId = schema.value.team_id;
            // Get user teams
            const team = await models.user_teams.findOne({
                where: {
                    id: teamId,
                },
                include: [{
                    model: models.fixtures,
                    as: 'fixture',
                }],
            });

            if (!team) {
                return res.json({
                    status: false,
                    message: "Team not found",
                    data: null
                });
            }

            if (team.fixture.status === 'NOT STARTED' && team.user_id.toString() !== req.userId.toString()) {
                return res.json({
                    status: false,
                    message: "Please wait till the match starts to view other teams.",
                    data: null
                });
            }

            try {
                team.players = JSON.parse(team.players);
            } catch (e) {
            }

            // Get squad
            const squads = await models.squads.findAll({
                where: {
                    fixture_id: team.fixture_id,
                    player_id: team.players
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
            for (let squad of squads) {
                squad = squad.toJSON();
                squad.team = squad.team_id.toString() === squad.fixture.teama_id.toString() ? squad.fixture.teama_short_name : squad.fixture.teamb_short_name;
                const player = squad.player;
                delete squad.player;
                delete squad.fixture;
                players.push({
                    ...squad,
                    ...player,
                    is_captain: squad.player_id === team.captain_id,
                    is_vice_captain: squad.player_id === team.vice_captain_id,
                });
            }

            const data = {
                name: team.name,
                points: parseFloat(team.total_points),
                teama: team.fixture.teama_short_name,
                teama_count: players.filter(el => el.team_id.toString() === team.fixture.teama_id.toString()).length,
                teamb: team.fixture.teamb_short_name,
                teamb_count: players.filter(el => el.team_id.toString() === team.fixture.teamb_id.toString()).length,
                wicket_keepers: players.filter(el => el.role === 'WK'),
                batsmen: players.filter(el => el.role === 'BAT'),
                all_rounders: players.filter(el => el.role === 'AR'),
                bowlers: players.filter(el => el.role === 'BOWL')
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

module.exports = router;

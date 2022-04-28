const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const {Op} = require("sequelize");

router.get("/",
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                fixture_id: Joi.number().required(),
                contest_id: Joi.allow(null),
                type: Joi.string().required().valid('merchant', 'private', 'admin', 'none')
            }).validate(req.query)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            let teamsIds = [];
            const type = schema.value.type;
            if (schema.value.contest_id) {
                if (type === 'merchant') {
                    const res = await models.user_contests.findAll({
                        where: {
                            user_id: req.userId,
                            contest_id: schema.value.contest_id
                        },
                        attributes: ['user_team_id'],
                        raw: true
                    })

                    res.map((res) => {
                        teamsIds.push(res.user_team_id);
                    })
                } else if (type === 'private') {
                    const res = await models.user_private_contests.findAll({
                        where: {
                            user_id: req.userId,
                            private_contest_id: schema.value.contest_id
                        },
                        attributes: ['user_team_id'],
                        raw: true
                    })
                    res.map((res) => {
                        teamsIds.push(res.user_team_id);
                    })
                } else if (type === 'admin') {
                    const res = await models.admin_user_contests.findAll({
                        where: {
                            user_id: req.userId,
                            contest_id: schema.value.contest_id
                        },
                        attributes: ['user_team_id'],
                        raw: true
                    })

                    res.map((res) => {
                        teamsIds.push(res.user_team_id);
                    })
                }
            }

            const fixtureId = schema.value.fixture_id;

            // Get user teams
            const data = await models.user_teams.findAll({
                where: {
                    fixture_id: fixtureId,
                    user_id: req.userId,
                    id: {
                        [Op.notIn]: teamsIds
                    }
                },
                attributes: ['id', 'name', 'captain_id', 'vice_captain_id', 'players', 'total_points']
            });

            // Get squad
            const squads = await models.squads.findAll({
                where: {
                    fixture_id: fixtureId,
                },
                include: [{
                    model: models.players,
                    as: 'player',
                }],
            });

            const fixture = await models.fixtures.findByPk(fixtureId);

            const teams = [];
            for (const t of data) {
                const team = t.toJSON();

                try {
                    team.players = JSON.parse(team.players);
                } catch (e) {
                }

                // get captain
                const captain = squads.find(s => s.player_id === t.captain_id).toJSON();

                team.captain = {
                    id: captain.player_id,
                    name: captain.player.name,
                    short_name: captain.player.short_name,
                    image: captain.player.image,
                    team_id: captain.team_id,
                    team_name: captain.team_id.toString() === fixture.teama_id.toString() ? fixture.teama_short_name : fixture.teamb_short_name,
                };

                // get vice captain
                const viceCaptain = squads.find(s => s.player_id === t.vice_captain_id).toJSON();

                team.vice_captain = {
                    id: viceCaptain.player_id,
                    name: viceCaptain.player.name,
                    short_name: viceCaptain.player.short_name,
                    image: viceCaptain.player.image,
                    team_id: viceCaptain.team_id,
                    team_name: viceCaptain.team_id.toString() === fixture.teama_id.toString() ? fixture.teama_short_name : fixture.teamb_short_name,
                };

                // count player by role
                const teamSquad = squads.filter(el => team.players.includes(el.player_id));
                team.wicket_keepers = teamSquad.filter(el => el.role === 'WK').length;
                team.batsmen = teamSquad.filter(el => el.role === 'BAT').length;
                team.all_rounders = teamSquad.filter(el => el.role === 'AR').length;
                team.bowlers = teamSquad.filter(el => el.role === 'BOWL').length;

                team.teama = fixture.teama_short_name;
                team.teama_count = teamSquad.filter(el => el.team_id.toString() === fixture.teama_id.toString()).length;
                team.teamb = fixture.teamb_short_name;
                team.teamb_count = teamSquad.filter(el => el.team_id.toString() === fixture.teamb_id.toString()).length;
                delete team.players;
                teams.push(team);
            }

            return res.json({
                status: true,
                message: null,
                data: teams
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

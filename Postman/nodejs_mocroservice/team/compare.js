const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const {Op} = require("sequelize");
const Leaderboard = require("../_helpers/leaderboard");

router.post("/compare",
    async (req, res) => {
        try {

            // Validation
            const schema = Joi.object({
                contest_id: Joi.string().required(),
                fixture_id: Joi.number().required(),
                team_ids: Joi.array().unique().items(Joi.string()).required(),
            }).validate(req.body)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            const data = schema.value;

            // Get fixture
            const fixture = await models.fixtures.findByPk(data.fixture_id, {
                where: {
                    is_active: 1,
                    // [Op.not]: [{
                    //     status: 'NOT STARTED',
                    // }]
                }
            });

            if (!fixture) {
                return res.json({
                    status: false,
                    message: 'Match not found.',
                    data: null
                });
            }

            const userTeams = await models.user_teams.findAll({
                where: {
                    id: data.team_ids,
                    fixture_id: data.fixture_id
                },
                include: [
                    {
                        model: models.users,
                        as: 'user',
                        attributes: ['username', 'photo']
                    }
                ]
            });

            const teamOne = userTeams.find(el => el.user_id = req.userId).toJSON();
            const teamTwo = userTeams.find(el => el.id !== teamOne.id).toJSON();

            try {
                teamOne.players = JSON.parse(teamOne.players);
                teamTwo.players = JSON.parse(teamTwo.players);
            } catch (e) {
            }

            if (userTeams.length !== 2) {
                return res.json({
                    status: false,
                    message: 'Team not found.',
                    data: null
                });
            }

            // Get squad
            const squads = await models.squads.findAll({
                where: {
                    fixture_id: data.fixture_id,
                    player_id: [...teamOne.players, ...teamTwo.players]
                },
                attributes: ['player_id', 'team_id', 'total_points'],
                include: [{
                    model: models.players,
                    as: 'player',
                    attributes: ['short_name', 'image'],
                }],
            });

            const players = [];
            for (let squad of squads) {
                squad = squad.toJSON();
                const player = squad.player;
                delete squad.player;
                squad.total_points = parseFloat(squad.total_points)
                players.push({
                    ...squad,
                    ...player
                });
            }

            const teamOneCaptainViceCaptain = [teamOne.captain_id, teamOne.vice_captain_id]
            const teamTwoCaptainViceCaptain = [teamTwo.captain_id, teamTwo.vice_captain_id]

            // Common Players
            const commonPlayers = players
                .filter(el => teamOne.players.includes(el.player_id) && teamTwo.players.includes(el.player_id))
                .filter(el => !teamOneCaptainViceCaptain.includes(el.player_id))
                .filter(el => !teamTwoCaptainViceCaptain.includes(el.player_id));

            const commonPlayersPoint = commonPlayers.map(el => el.total_points).reduce((a, b) => a + b, 0);

            const commonPlayersIds = commonPlayers.map(el => el.player_id);

            // Different Players
            const teamOneDifferentPlayers = players
                .filter(el => teamOne.players.includes(el.player_id))
                .filter(el => !commonPlayersIds.includes(el.player_id))
                .filter(el => !teamOneCaptainViceCaptain.includes(el.player_id))

            const teamTwoDifferentPlayers = players
                .filter(el => teamTwo.players.includes(el.player_id))
                .filter(el => !commonPlayersIds.includes(el.player_id))
                .filter(el => !teamTwoCaptainViceCaptain.includes(el.player_id))

            const lb = new Leaderboard('leaderboard:' + data.contest_id);

            lb.rankedInList(data.team_ids, null, function (ld) {

                const response = {
                    teamOne: {
                        photo: teamOne.user.photo,
                        name: `${teamOne.user.username}(${teamOne.name})`,
                        rank: ld.find(l => l.member === teamOne.id).rank,
                        points: teamOne.total_points,
                        captain: players.find(el => el.player_id === teamOne.captain_id),
                        vice_captain: players.find(el => el.player_id === teamOne.vice_captain_id),
                        captain_vice_captain_points: players.filter(el => teamOneCaptainViceCaptain.includes(el)).map(el => el.total_points).reduce((a, b) => a + b, 0),
                        common_players: commonPlayers,
                        common_players_points: commonPlayersPoint,
                        different_players: teamOneDifferentPlayers,
                        different_players_points: teamOneDifferentPlayers.map(el => el.total_points).reduce((a, b) => a + b, 0)
                    },
                    teamTwo: {
                        photo: teamTwo.user.photo,
                        name: `${teamTwo.user.username}(${teamTwo.name})`,
                        rank: ld.find(l => l.member === teamTwo.id).rank,
                        points: teamTwo.total_points,
                        captain: players.find(el => el.player_id === teamTwo.captain_id),
                        vice_captain: players.find(el => el.player_id === teamTwo.vice_captain_id),
                        captain_vice_captain_points: players.filter(el => teamTwoCaptainViceCaptain.includes(el)).map(el => el.total_points).reduce((a, b) => a + b, 0),
                        common_players: commonPlayers,
                        common_players_points: commonPlayersPoint,
                        different_players: teamTwoDifferentPlayers,
                        different_players_points: teamTwoDifferentPlayers.map(el => el.total_points).reduce((a, b) => a + b, 0)
                    },
                }

                return res.json({
                    status: true,
                    message: null,
                    data: response
                });

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

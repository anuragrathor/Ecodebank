const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
var DataTypes = require("sequelize").DataTypes;
const adminDb = require("../_db/admin");
const {Op} = require("sequelize");
const env = require("../_config/env");
const kafka = require("../_db/kafka");
const adminSettings = require("../_models/settings")(adminDb.sequelize, DataTypes);
const kafkaConfig = require('../_config/kafka');
const db = require("../_db/index");
const redis = require("../_db/redis");

router.put("/",
    async (req, res) => {
        try {
            // Team settings
            let minPlayers = 11;
            let maxPlayers = 11;
            let minWicketKeepers = 1;
            let maxWicketKeepers = 4;
            let minBatsmen = 3;
            let maxBatsmen = 6;
            let minAllRounders = 1;
            let maxAllRounders = 4;
            let minBowlers = 3;
            let maxBowlers = 6;
            let maxPlayerPerTeam = 7;
            const settings = await adminSettings.findOne({where: {key: 'teams'}});

            if (settings) {
                let team = settings.dataValues.value;
                try {
                    team = JSON.parse(settings.dataValues.value);
                } catch (e) {
                }
                minPlayers = team.min_players;
                maxPlayers = team.max_players;
                minWicketKeepers = team.min_wicket_keepers;
                maxWicketKeepers = team.max_wicket_keepers;
                minBatsmen = team.min_batsmen;
                maxBatsmen = team.max_batsmen;
                minAllRounders = team.min_all_rounders;
                maxAllRounders = team.max_all_rounders;
                minBowlers = team.min_bowlers;
                maxBowlers = team.max_bowlers;
                maxPlayerPerTeam = team.max_players_per_team;
            }

            // Validation
            const schema = Joi.object({
                id: Joi.string().required(),
                players: Joi.array()
                    .min(minPlayers)
                    .max(maxPlayers)
                    .unique()
                    .items(Joi.number())
                    .required(),
                captain_id: Joi.number()
                    .equal(...req.body.players)
                    .required()
                    .messages({'any.only': 'Please select valid captain id'}),
                vice_captain_id: Joi.number()
                    .equal(...req.body.players.filter(el => el !== req.body.captain_id))
                    .required()
                    .messages({'any.only': 'Please select valid vice captain id'})

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
            const team = await models.user_teams.findOne({
                where: {
                    id: data.id,
                    user_id: req.userId,
                },
                include: [{
                    model: models.fixtures,
                    as: 'fixture',
                }],
                attributes: ['id', 'fixture_id', 'name', 'captain_id', 'vice_captain_id', 'players', 'total_points']
            });

            if (!team) {
                return res.json({
                    status: false,
                    message: 'Invalid request',
                    data: null
                });
            }


            if (team.fixture.status !== 'NOT STARTED' || !team.fixture.is_active) {
                return res.json({
                    status: false,
                    message: 'Match started or completed',
                    data: null
                });
            }

            // Get squad
            const squads = await models.squads.findAll({
                where: {
                    fixture_id: team.fixture_id,
                    player_id: data.players
                }
            });

            // Validate squad count against players array
            if (squads.length < minPlayers) {
                return res.json({
                    status: false,
                    message: `The players you have selected is invalid.`,
                    data: null
                });
            }

            if (squads.length > maxPlayers) {
                return res.json({
                    status: false,
                    message: `The team must not have more than ${maxPlayers} players`,
                    data: null
                });
            }

            // Credit validation
            const totalCredits = squads.map(el => parseFloat(el.fantasy_player_rating)).reduce((a, b) => a + b, 0);

            if (totalCredits > 100) {
                return res.json({
                    status: false,
                    message: 'The total credit must not have more than 100.',
                    data: null
                });
            }

            // Per team player validation
            const teamA = squads.filter(el => el.team_id.toString() === team.fixture.teama_id.toString()).length;
            const teamB = squads.filter(el => el.team_id.toString() === team.fixture.teamb_id.toString()).length;

            if (teamA > maxPlayerPerTeam || teamB > maxPlayerPerTeam) {
                return res.json({
                    status: false,
                    message: `Max ${maxPlayerPerTeam} players from one team allowed.`,
                    data: null
                });
            }

            // Wicket keeper validation
            const wicketKeepers = squads.filter(el => el.role === 'WK').length;

            if (wicketKeepers < minWicketKeepers || wicketKeepers > maxWicketKeepers) {
                return res.json({
                    status: false,
                    message: `Please select ${minWicketKeepers}-${maxWicketKeepers} wicket keepers.`,
                    data: null
                });
            }

            // Batsmen validation
            const batsmen = squads.filter(el => el.role === 'BAT').length;

            if (batsmen < minBatsmen || batsmen > maxBatsmen) {
                return res.json({
                    status: false,
                    message: `Please select ${minBatsmen}-${maxBatsmen} batsmen.`,
                    data: null
                });
            }

            // All rounder validation
            const allRounders = squads.filter(el => el.role === 'AR').length;

            if (allRounders < minAllRounders || allRounders > maxAllRounders) {
                return res.json({
                    status: false,
                    message: `Please select ${minAllRounders}-${maxAllRounders} all rounders.`,
                    data: null
                });
            }

            // Bowler validation
            const bowlers = squads.filter(el => el.role === 'BOWL').length;

            if (bowlers < minBowlers || bowlers > maxBowlers) {
                return res.json({
                    status: false,
                    message: `Please select ${minBowlers}-${maxBowlers} bowlers.`,
                    data: null
                });
            }

            // Duplicate team verification
            const joinedTeams = await models.user_teams.findAll({
                where: {
                    user_id: req.userId,
                    fixture_id: team.fixture_id,
                    [Op.not]: [
                        {
                            id: data.id
                        }
                    ]
                }
            });

            for (const t of joinedTeams) {
                const team = t.toJSON();

                try {
                    team.players = JSON.parse(team.players);
                } catch (e) {
                }

                const difference = data.players.filter(p => !team.players.includes(p));

                if (difference.length === 0 && data.captain_id === team.captain_id && data.vice_captain_id === team.vice_captain_id) {
                    return res.json({
                        status: false,
                        message: 'Team already exists.',
                        data: null
                    });
                }
            }

            data['players'] = JSON.stringify(data.players);

            await db.sequelize.transaction(async () => {

                let oldPlayers = team.players;
                try {
                    oldPlayers = JSON.parse(team.players)
                } catch (e) {
                }

                await team.update(data);

                data['merchant_id'] = env.merchantId;
                data['user_id'] = req.userId;
                data['players'] = JSON.parse(data.players);

                for (let p of data.players) {
                    await redis.ZINCRBY(`selectedByFixture:${team.fixture_id}`, 1, p);
                }

                await redis.ZINCRBY(`captainSelectedByFixture:${team.fixture_id}`, 1, data.captain_id);
                await redis.ZINCRBY(`viceCaptainSelectedByFixture:${team.fixture_id}`, 1, data.vice_captain_id);

                for (let p of oldPlayers) {
                    await redis.ZINCRBY(`selectedByFixture:${team.fixture_id}`, -1, p);
                }

                await redis.ZINCRBY(`captainSelectedByFixture:${team.fixture_id}`, -1, data.captain_id);
                await redis.ZINCRBY(`viceCaptainSelectedByFixture:${team.fixture_id}`, -1, data.vice_captain_id);

                await kafka.sendMessage(kafkaConfig.adminTopic, [{type: 'updateUserTeam', data}]);
            });

            return res.json({
                status: true,
                message: 'Team updated.',
                data: null
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

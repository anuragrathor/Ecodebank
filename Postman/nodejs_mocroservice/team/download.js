const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const adminModels = require("../_admin_models/index");
const Joi = require("joi");
const fs = require("fs");
const pdf = require("pdf-creator-node");
const {Op} = require("sequelize");
const db = require("../_db/index");

router.get("/download",
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                contest_id: Joi.required(),
                type: Joi.string().required().valid('merchant', 'private', 'admin')
            }).validate(req.query);

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                });
            }
            const params = schema.value;
            const q = {
                where: {
                    id: params.contest_id,
                },
                include: [{
                    model: models.fixtures,
                    as: 'fixture',
                }],
            }

            let contest;
            let teamIds = [];
            if (params.type === 'merchant') {
                contest = await models.contests.findOne(q);
                teamIds = await models.user_contests.findAll({
                    attributes: [
                        'user_team_id',
                    ],
                    where: {
                        contest_id: params.contest_id,
                    },
                    raw: true
                })
            } else if (params.type === 'private') {
                contest = await models.private_contests.findOne(q);
                teamIds = await models.user_private_contests.findAll({
                    attributes: [
                        'user_team_id',
                    ],
                    where: {
                        private_contest_id: params.contest_id,
                    },
                    raw: true
                })
            } else if (params.type === 'admin') {
                contest = await adminModels.contests.findOne(q);
                teamIds = await adminModels.user_contests.findAll({
                    attributes: [
                        'user_team_id',
                    ],
                    where: {
                        contest_id: params.contest_id,
                    },
                    raw: true
                })
            }

            if (!contest) {
                return res.json({
                    status: false,
                    message: 'Contest not found.',
                    data: null
                });
            }

            if (contest.fixture === 'NOT STARTED') {
                return res.json({
                    status: false,
                    message: 'You can download team after match started.',
                    data: null
                });
            }

            const userTeams = await models.user_teams.findAll({
                where: {
                    id: teamIds.map(el => el.user_team_id)
                },
                include: [
                    {
                        model: models.users,
                        as: 'user',
                        attributes: ['username']
                    }
                ]
            });


            const players = await models.players.findAll({
                where: {
                    id: {
                        [Op.in]: db.sequelize.literal(`(SELECT player_id FROM squads as s WHERE s.player_id = players.id)`)
                    }
                },
                attributes: ['id', 'name'],
                raw: true
            });

            let NewData = [];

            for (let userTeam of userTeams) {
                userTeam = userTeam.toJSON();
                try {
                    userTeam.players = JSON.parse(userTeam.players);
                } catch (e) {
                }
                const captain = players.find(el => el.id.toString() === userTeam.captain_id.toString());
                const viceCaptain = players.find(el => el.id.toString() === userTeam.vice_captain_id.toString());

                const team = [];
                team.push(captain.name);
                team.push(viceCaptain.name);

                for (const p of userTeam.players.filter(el => ![captain.id, viceCaptain.id].includes(el))) {
                    const player = players.find(el => el.id.toString() === p.toString());
                    team.push(player.name);
                }

                let drawData = {
                    'team': userTeam.user.username,
                    'player1': team[0],
                    'player2': team[1],
                    'player3': team[2],
                    'player4': team[3],
                    'player5': team[4],
                    'player6': team[5],
                    'player7': team[6],
                    'player8': team[7],
                    'player9': team[8],
                    'player10': team[9],
                    'player11': team[10],
                };

                NewData.push(drawData);
            }

            let otherData = {
                match: contest.fixture.teama_short_name + ' vs ' + contest.fixture.teamb_short_name,
                entry_fee: contest.entry_fee,
                contest: contest.prize,
                invite_code: contest.invite_code,
                total_teams: contest.total_teams
            }

            // var html = fs.readFileSync("teamTemplate.html", "utf8");
            var html = fs.readFileSync(process.cwd() + "/team/teamTemplate.html", "utf8");
            var options = {
                format: "A4",
                orientation: "landscape",
                border: "10mm",
                header: {
                    height: "45mm",
                    contents: '<div style="text-align: center;">DQOT APP</div>'
                },
                footer: {
                    height: "28mm",
                    contents: {
                        first: 'Cover page',
                        2: 'Second page', // Any page number is working. 1-based index
                        default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                        last: 'Last Page'
                    }
                }
            };

            var document = {
                html,
                data: {
                    teams: NewData,
                    other: otherData
                },
                type: "stream",
            };

            pdf.create(document, options).then((data) => {
                fs.readFile(data.path, function (err, f) {
                    res.contentType("application/pdf");
                    res.send(f);
                });
            }).catch((error) => {
                console.error(error);
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

const express = require('express');
const router = express.Router();
const models = require("../_models/index");
const Joi = require("joi");
const Leaderboard = require("../_helpers/leaderboard");
const db = require("../_db/index");

router.post("/switch-team",
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                contest_id: Joi.string().required(),
                current_user_team_id: Joi.string().required(),
                new_user_team_id: Joi.string().required(),
            }).validate(req.body)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            const data = schema.value;

            // Get contest with fixture
            const contest = await models.contests.findOne({
                where: {
                    id: data.contest_id,
                    status: 'LIVE'
                },
                include: [{
                    model: models.fixtures,
                    as: 'fixture',
                }],
                attributes: ['id', 'fixture_id']
            });

            if (!contest) {
                return res.json({
                    status: false,
                    message: 'Contest not found',
                    data: null
                });
            }

            if (contest.fixture.status !== 'NOT STARTED' || !contest.fixture.is_active) {
                return res.json({
                    status: false,
                    message: 'Match started or completed',
                    data: null
                });
            }

            // Check all user teams exists for fixture
            const userTeam = await models.user_teams.findOne({
                where: {
                    id: data.new_user_team_id,
                    fixture_id: contest.fixture_id,
                    user_id: req.userId
                }
            });

            if (!userTeam) {
                return res.json({
                    status: false,
                    message: 'Invalid request.',
                    data: null
                });
            }

            // Get count of joined contest by any user team id
            const joinedContestsByTeam = await models.user_contests.count({
                where: {
                    contest_id: data.contest_id,
                    user_team_id: data.new_user_team_id,
                    user_id: req.userId
                }
            });

            // Max team validation
            if (joinedContestsByTeam > 0) {
                return res.json({
                    status: false,
                    message: `Contest has already been joined by requested team.`,
                    data: null
                });
            }
            await db.sequelize.transaction(async () => {
                await models.user_contests.update({
                        user_team_id: data.new_user_team_id
                    },
                    {
                        where: {
                            contest_id: data.contest_id,
                            user_team_id: data.current_user_team_id,
                            user_id: req.userId
                        }
                    });

                const user = await models.users.findByPk(req.userId);

                const lb = new Leaderboard('leaderboard:' + data.contest_id);
                lb.removeMember(data.current_user_team_id);
                lb.rankMember(data.new_user_team_id, 0, JSON.stringify({
                    id: user.id,
                    username: user.username,
                    photo: user.photo,
                    prevRank: 0,
                    private: false,
                    teamName: userTeam.name
                }));
            });
            return res.json({
                status: true,
                message: 'Team switched.',
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

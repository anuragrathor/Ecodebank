const express = require('express');
const router = express.Router();
const Joi = require("joi");
const redis = require("../_db/redis");

router.get("/:fixture_id",
    async (req, res) => {
        try {
            // Validation
            const schema = Joi.object({
                fixture_id: Joi.string().required(),
            }).validate(req.params)

            if (schema.error) {
                return res.json({
                    status: false,
                    message: schema.error.message,
                    data: null
                })
            }

            const data = schema.value;
            const response = [];
            let scorecard = await redis.get('scorecard:' + data.fixture_id);
            try {
                scorecard = JSON.parse(scorecard);
            } catch (e) {
            }

            if (scorecard) {
                const squads = scorecard.players;
                const innings = scorecard.innings;
                const teama = scorecard.teama;
                const teamb = scorecard.teamb;
                if (innings) {
                    for (const inning of innings) {
                        let team = {...teama};
                        if (teamb['team_id'] === inning['batting_team_id']) {
                            team = {...teamb}
                        }

                        const teamName = team['short_name'];

                        const overs = team['overs'] ?? "0";

                        const scores = team['scores'] ?? "";
                        const batsmen = [];
                        if (inning.batsmen) {
                            for (const batsman of inning.batsmen) {
                                const player = squads.find(el => el.pid.toString() === batsman.batsman_id);
                                if (player) {
                                    batsmen.push({
                                        'name': player['short_name'],
                                        'how_out': batsman['how_out'],
                                        'batting': batsman['batting'] === "true",
                                        'runs': batsman['runs'],
                                        'balls_faced': batsman['balls_faced'],
                                        'fours': batsman['fours'],
                                        'sixes': batsman['sixes'],
                                        'strike_rate': batsman['strike_rate'],
                                    });
                                }
                            }
                        }

                        const didNotBat = [];
                        if (inning.did_not_bat) {
                            for (const batsman of inning.did_not_bat) {
                                const player = squads.find(el => el.pid.toString() === batsman.player_id);
                                if (player) {
                                    didNotBat.push({
                                        'name': player['short_name'],
                                    });
                                }
                            }
                        }

                        const extraRuns = inning['extra_runs'];
                        const extras = {
                            'label': 'EXTRAS',
                            'notes': `(nb ${extraRuns['noballs']}, wd ${extraRuns['wides']}, b ${extraRuns['byes']}, lb ${extraRuns['legbyes']}, wd ${extraRuns['wides']})`,
                            'value': extraRuns['total']
                        }

                        const equations = inning['equations'];
                        const total = {
                            'label': 'TOTAL',
                            'notes': `(${equations['wickets']} wickets, ${equations['overs']} overs)`,
                            'value': equations['runs']
                        }

                        const bowlers = [];
                        if (inning['bowlers']) {
                            for (const bowler of inning['bowlers']) {
                                const player = squads.find(el => el.pid.toString() === bowler.bowler_id);
                                if (player) {
                                    bowlers.push({
                                        'name': player['short_name'],
                                        'bowling': bowler['bowling'] === "true",
                                        'overs': bowler['overs'],
                                        'maidens': bowler['maidens'],
                                        'runs': bowler['runs_conceded'],
                                        'wickets': bowler['wickets'],
                                        'wide': bowler['wides'],
                                        'noballs': bowler['noballs'],
                                        'econ': bowler['econ']
                                    })
                                }
                            }
                        }

                        const fows = [];

                        if (inning['fows']) {
                            for (const fow of inning['fows']) {
                                const player = squads.find(el => el.pid.toString() === fow.batsman_id);
                                if (player) {
                                    fows.push({
                                        'name': player['short_name'],
                                        'score': fow['score_at_dismissal'],
                                        'overs': fow['overs_at_dismissal']
                                    });
                                }
                            }
                        }
                        response.push({
                            'name': teamName,
                            'overs': overs,
                            'scores': scores,
                            'batsmen': batsmen,
                            'extras': extras,
                            'did_not_bat': didNotBat,
                            'total': total,
                            'bowlers': bowlers,
                            'fows': fows
                        })
                    }
                }
            }
            return res.json({
                status: true,
                message: null,
                data: response
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

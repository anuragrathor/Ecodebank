const express = require('express');
const router = express.Router();
const models = require("../_models/index");

router.get("/level", async (req, res) => {
    try {

        const user = await models.users.findByPk(req.userId);
        const settings = await models.settings.findOne({
            where: {
                key: 'level_limit'
            }
        });
        let settingData = JSON.parse(settings.value);
        let nextLevel = (user.level + 1);
        let nextLevelContestSize = (nextLevel * settingData.limit);
        const contestCount = await models.user_contests.count({
            where: {
                user_id: req.userId
            },
            include: [{
                model: models.contests,
                as: 'contest',
                where: {type: ['PAID', 'FREE', 'DISCOUNT']},
                required: false,
            }]
        });

        let targetContestCount = (nextLevelContestSize - contestCount);
        return res.json({
            status: true,
            message: null,
            data: {
                current_level: user.level,
                next_level: nextLevel,
                tasks: ["Play " + targetContestCount + " more paid contest to level up"],
                progress_bar: ((targetContestCount / settingData.limit) * 100),
                unlock: {
                    label: 'Unlock on level ' + nextLevel,
                    value: parseFloat(settingData.bonus)
                }
            }
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

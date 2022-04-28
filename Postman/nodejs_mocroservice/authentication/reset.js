const express = require('express');
const router = express.Router();
var fs = require('fs');
const Joi = require("joi");

router.get("/reset", async (req, res) => {
    try {
        const schema = Joi.object({
            token: Joi.string().required(),
            email: Joi.string().email().required(),
        }).validate(req.query)

        if (schema.error) {
            return res.send('Invalid request.');
        }

        fs.readFile(process.cwd() + '/authentication/reset.html', function (err, html) {
            if (err) {
                throw err;
            }
            res.set({"Content-Security-Policy": "script-src 'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com https://ajax.googleapis.com"});
            res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': html.length});
            res.write(html);
            res.end();
        });
    } catch (e) {
        console.error(e);
        return res.send('Server error');
    }
});

module.exports = router;

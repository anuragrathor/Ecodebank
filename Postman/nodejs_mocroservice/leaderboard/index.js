const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require('../_config/env');
const log = require('../_middlewares/log');
const auth = require('../_middlewares/auth');
const app = express();
app.use(helmet());

const PORT = process.env.PORT || env.port.leaderboard;

const corsOptions = {
    origin: env.origin
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.use(auth);
app.use(log.request);

const prefix = '/leaderboard';
app.use(prefix, require('./show'))
app.use(prefix, require('./my'))
app.use(prefix, require('./page'))

app.listen(PORT, () => {
    console.log(`Leaderboard service is running on port ${PORT}.`);
});

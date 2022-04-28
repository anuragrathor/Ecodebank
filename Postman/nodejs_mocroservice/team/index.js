const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require('../_config/env')
const auth = require('../_middlewares/auth');
const errorHandler = require("../_helpers/error-handler");
const log = require("../_middlewares/log");
const app = express();
app.use(helmet());
const PORT = process.env.PORT || env.port.team;

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

const prefix = '/teams';
app.use(prefix, require('./list'))
app.use(prefix, require('./create'))
app.use(prefix, require('./update'))
app.use(prefix, require('./setting'))
app.use(prefix, require('./download'))
app.use(prefix, require('./show'))
app.use(prefix, require('./compare'))
app.use(prefix, require('./dream_team'))

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Team service is running on port ${PORT}.`);
});

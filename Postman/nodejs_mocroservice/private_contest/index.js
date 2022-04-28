const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require('../_config/env')
const auth = require('../_middlewares/auth');
const errorHandler = require('../_helpers/error-handler');
const log = require("../_middlewares/log");
const app = express();
app.use(helmet());
const PORT = process.env.PORT || env.port.privateContest;

const corsOptions = {
    origin: env.origin
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(auth);
app.use(log.request);

const prefix = '/private_contest';
app.use(prefix, require('./create'))
app.use(prefix, require('./ranks'))
app.use(prefix, require('./join'))
app.use(prefix, require('./my'))
app.use(prefix, require('./switch-team'))
app.use(prefix, require('./settings'))
app.use(prefix, require('./show'))

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Private contest service is running on port ${PORT}.`);
});

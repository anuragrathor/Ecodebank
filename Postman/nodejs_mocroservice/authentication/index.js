const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require('../_config/env')
const auth = require('../_middlewares/auth');
const errorHandler = require('../_helpers/error-handler');
const log = require("../_middlewares/log");
const redis = require("../_db/redis");
const app = express();
app.use(helmet());
const PORT = process.env.PORT || env.port.authentication;

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

const prefix = '/auth';

app.use(prefix, require('./me'));
app.use(prefix, require('./otp'));
app.use(prefix, require('./register'));
app.use(prefix, require('./login'));
app.use(prefix, require('./profile'));
app.use(prefix, require('./teamname'));
app.use(prefix, require('./change-password'));
app.use(prefix, require('./forgot-password'));
app.use(prefix, require('./reset-password'));
app.use(prefix, require('./verify-email'));
app.use(prefix, require('./logout'));
app.use(prefix, require('./invite'));
app.use(prefix, require('./level'));
app.use(prefix, require('./social-login'));
app.use(prefix, require('./profile-picture'));
app.use(prefix, require('./stats'));
app.use(prefix, require('./states'));
app.use(prefix, require('./reset'));
app.use(prefix, require('./notification'));
app.use(prefix, require('./invite-contest'));
app.use(prefix, require('./version'));

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Authentication service is running on port ${PORT}.`);
});


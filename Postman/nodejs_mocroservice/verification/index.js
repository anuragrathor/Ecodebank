const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require('../_config/env')
const auth = require('../_middlewares/auth');
const errorHandler = require('../_helpers/error-handler');
const log = require("../_middlewares/log");
const app = express();
app.use(helmet());
const PORT = process.env.PORT || env.port.verification;

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

const prefix = '/verification';
app.use(prefix, require('./list'))
app.use(prefix, require('./bank'))
app.use(prefix, require('./pancard'))
app.use(prefix, require('./email'))
app.use(prefix, require('./phone'))

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Verification service is running on port ${PORT}.`);
});

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require('../_config/env')
const auth = require('../_middlewares/auth');
const errorHandler = require('../_helpers/error-handler');
const log = require("../_middlewares/log");
const app = express();
app.use(helmet());
const PORT = process.env.PORT || env.port.wallet;

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

const prefix = '/wallet';
app.use(prefix, require('./show'))
app.use(prefix, require('./add'))
app.use(prefix, require('./withdraw'))
app.use(prefix, require('./history'))
app.use(prefix, require('./export'))
app.use(prefix, require('./invoice'))

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Wallet service is running on port ${PORT}.`);
});

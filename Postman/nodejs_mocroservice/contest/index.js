const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require('../_config/env')
const errorHandler = require("../_helpers/error-handler");
const auth = require('../_middlewares/auth');
const ownPaymentGateway = require('../_middlewares/own-payment-gateway');
const log = require("../_middlewares/log");
const app = express();
app.use(helmet());
const PORT = process.env.PORT || env.port.contest;

const corsOptions = {
    origin: env.origin
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
app.use(auth);
app.use(ownPaymentGateway);
app.use(log.request);

const prefix = '/contests';
app.use(prefix, require('./list'))
app.use(prefix, require('./join'))
app.use(prefix, require('./my'))
app.use(prefix, require('./show'))
app.use(prefix, require('./switch-team'))

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Contest service is running on port ${PORT}.`);
});

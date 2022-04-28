const config = require("../_config/redis");
const asyncRedis = require("async-redis");

const client = asyncRedis.createClient({
    host: config.host,
    port: config.port,
    prefix: config.prefix,
    // password: config.password,
});

module.exports = client;

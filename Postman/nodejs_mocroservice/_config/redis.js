require('dotenv').config();
module.exports = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 'root',
    password: process.env.REDIS_PASSWORD || '',
    prefix: process.env.REDIS_PREFIX || ''
};

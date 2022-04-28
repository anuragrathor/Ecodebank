require('dotenv').config();
module.exports = {
    host: process.env.SUPERADMIN_REDIS_HOST || 'localhost',
    port: process.env.SUPERADMIN_REDIS_PORT || 6379,
    password: process.env.SUPERADMIN_REDIS_PASSWORD || '',
    prefix: process.env.SUPERADMIN_REDIS_PREFIX || 'dqot_database_'
};

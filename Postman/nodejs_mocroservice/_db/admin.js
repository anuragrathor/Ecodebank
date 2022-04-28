const config = require("../_config/admin-db");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    },
    logging: process.env.NODE_ENV === 'production' ? false : console.log,
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    timezone: '+05:30'
    // logging: false
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

require('dotenv').config();
module.exports = {
    host: process.env.SUPERADMIN_DB_HOST || 'localhost',
    user: process.env.SUPERADMIN_DB_USER || 'root',
    password: process.env.SUPERADMIN_DB_PASSWORD || '',
    db: process.env.SUPERADMIN_DB_NAME || 'dqot_db',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

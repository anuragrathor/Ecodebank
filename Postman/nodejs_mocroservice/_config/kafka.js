require('dotenv').config();
module.exports = {
    brokers: [process.env.KAFKA_BROKER || ''],
    adminTopic: process.env.KAFKA_ADMIN_TOPIC || 'admin_update_h',
    merchantTopic: process.env.KAFKA_MERCHANT_TOPIC + process.env.MERCHANT_ID,
};

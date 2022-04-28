const redis = require("../_db/redis");
const Razorpay = require('razorpay');

async function Pay() {
    let razorConfig = JSON.parse(await redis.get('razorpay'));
    if (razorConfig) {
        return new Razorpay({
            key_id: razorConfig.access_key,
            key_secret: razorConfig.secret_key
        });
    } else {
        return null;
    }
}

module.exports = {Pay}


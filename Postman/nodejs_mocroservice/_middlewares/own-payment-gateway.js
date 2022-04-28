const env = require("../_config/env");
const adminRedis = require("../_db/admin-redis");
module.exports = async function verify(req, res, next) {

    const ownPaymentGateway = await adminRedis.sismember('merchant_own_payment_gateway', env.merchantId)

    if (ownPaymentGateway === 0) {
        return res.json({
            status: true,
            message: null,
            data: []
        })
    }

    return next();
}

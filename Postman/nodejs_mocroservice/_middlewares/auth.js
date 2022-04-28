const redis = require("../_db/redis");
const adminRedis = require("../_db/admin-redis");
const kafka = require("../_db/kafka");
const ignorePaths = [
    '/auth/login',
    '/auth/socialLogin',
    '/auth/register',
    '/auth/otp/send',
    '/auth/forgot-password',
    '/auth/reset',
    '/auth/reset-password',
    '/auth/verify-email',
    '/auth/version',
];

module.exports = async function verify(req, res, next) {

    if (!kafka.connected() || !redis.__redisClient.connected || !adminRedis.__redisClient.connected) {
        return res.json({
            status: false,
            message: 'Server error.',
            data: null
        })
    }

    var token;
    const ignore = ignorePaths.indexOf(req.path) > -1

    if (req.method === 'OPTIONS' && req.headers.hasOwnProperty('access-control-request-headers')) {
        var hasAuthInAccessControl = !!~req.headers['access-control-request-headers']
            .split(',').map(function (header) {
                return header.trim();
            }).indexOf('authorization');

        if (hasAuthInAccessControl) {
            return next();
        }
    }

    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2) {
            var scheme = parts[0];
            var credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
                req.token = token;
            } else {
                if (!ignore) {
                    return res.json({
                        status: false,
                        message: 'Invalid request.',
                        data: null
                    })
                }
            }
        } else {
            if (!ignore) {
                return res.json({
                    status: false,
                    message: 'Invalid request.',
                    data: null
                })
            }
        }
    }

    if (!token && !ignore) {
        return res.json({
            status: false,
            message: 'No authorization token was found.',
            data: null
        })
    }

    let user = await redis.get("auth:" + token);

    if (!user && !ignore) {
        return res.status(401).json({
            status: false,
            message: 'Invalid token.',
            data: null
        })
    }

    if (user) {
        try {
            user = JSON.parse(user);
            req.userId = user.id;
            req.user = user;
        } catch (e) {
        }
    }

    return next();
}

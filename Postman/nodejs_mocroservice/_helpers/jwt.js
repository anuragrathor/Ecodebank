const expressJwt = require('express-jwt');
const env = require('../_config/env');

module.exports = jwt;

function jwt() {
    const secret = env.secret;
    return expressJwt({secret, algorithms: ['HS256'], isRevoked}).unless({
        path: [
            // public routes that don't require authentication
            '/auth/login',
            '/auth/socialLogin',
            '/auth/register',
            '/auth/otp/send',
            '/auth/forgot-password',
            '/auth/reset-password',
        ]
    });
}

async function isRevoked(req, payload, done) {
    done();
}

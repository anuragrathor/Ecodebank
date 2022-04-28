const {OAuth2Client} = require('google-auth-library');
const env = require("../_config/env");


async function GoogleAuth(token) {
    const googleClient = new OAuth2Client(env.google_client_id);
    const ticket = await googleClient.getTokenInfo(token);
    return ticket;
}

async function FacebookAuth(token) {
    const googleClient = new OAuth2Client(env.google_client_id);
    const ticket = await googleClient.getTokenInfo(token);
    return ticket;
}

module.exports = {GoogleAuth, FacebookAuth}


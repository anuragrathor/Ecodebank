require('dotenv').config();
module.exports = {
    merchantId: process.env.MERCHANT_ID || 1,
    origin: process.env.APP_ORIGIN || 'http://localhost:8080',
    port: {
        fixture: process.env.FIXTURE_PORT || 8080,
        authentication: process.env.AUTHENTICATION_PORT || 8081,
        contest: process.env.CONTEST_PORT || 8082,
        leaderboard: process.env.LEADERBOARD_PORT || 8083,
        team: process.env.TEAM_PORT || 8084,
        wallet: process.env.WALLER_PORT || 8085,
        verification: process.env.VERIFICATION_PORT || 8086,
        scorecard: process.env.SCORECARD_PORT || 8087,
        privateContest: process.env.PRIVATE_CONTEST_PORT || 8088,
        adminContest: process.env.ADMIN_CONTEST_PORT || 8089,
        winner: process.env.WINNER_PORT || 8090,
    },
    secret: process.env.APP_SECRET || 'C582FCCF4AF6F14433E2736F8331A',
    google_client_id: process.env.GOOGLE_CLIENT_ID || '',
};

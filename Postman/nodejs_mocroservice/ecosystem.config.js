module.exports = {
    apps: [
        {
            name: "Fixture Update Queue",
            script: "/var/www/api/artisan",
            interpreter: "php",
            exec_mode: "fork",
            args: ['queue:work', '--daemon', '--queue=fixture'],
        },
        {
            name: "Lineup Update Queue",
            script: "/var/www/api/artisan",
            interpreter: "php",
            exec_mode: "fork",
            args: ['queue:work', '--daemon', '--queue=lineup'],
        },
        {
            name: "Squad Update Queue",
            script: "/var/www/api/artisan",
            interpreter: "php",
            exec_mode: "fork",
            args: ['queue:work', '--daemon', '--queue=squad'],
        },
        {
            name: "Point Update Queue",
            script: "/var/www/api/artisan",
            interpreter: "php",
            exec_mode: "fork",
            args: ['queue:work', '--daemon', '--queue=point'],
        },
        {
            name: "Leaderboard Update Queue",
            script: "/var/www/api/artisan",
            interpreter: "php",
            exec_mode: "fork",
            args: ['queue:work', '--daemon', '--queue=leaderboard'],
        },
        {
            name: "Admin Queue",
            script: "/var/www/api/artisan",
            interpreter: "php",
            exec_mode: "fork",
            args: ['queue:work', '--daemon'],
        },
        {
            name: "Admin Consumer",
            script: "/var/www/api/artisan",
            interpreter: "php",
            exec_mode: "fork",
            args: ['consume'],
        },
        {
            name: "Merchant Queue",
            script: "/var/www/merchant_api/artisan",
            interpreter: "php",
            exec_mode: "fork",
            args: ['queue:work', '--daemon'],
        },
        {
            name: "Merchant Email Queue",
            script: "/var/www/merchant_api/artisan",
            interpreter: "php",
            exec_mode: "fork",
            args: ['queue:work', '--daemon', '--queue=email'],
        },
        {
            name: "Merchant Consumer",
            script: "/var/www/merchant_api/artisan",
            interpreter: "php",
            exec_mode: "fork",
            args: ['consume'],
        },
        {
            name: "Fixture",
            script: "/var/www/micro_services/fixture/index.js",
        },
        {
            name: "Authentication",
            script: "/var/www/micro_services/authentication/index.js",
        },
        {
            name: "Contest",
            script: "/var/www/micro_services/contest/index.js",
        },
        {
            name: "Private Contest",
            script: "/var/www/micro_services/private_contest/index.js",
        },
        {
            name: "Admin Contest",
            script: "/var/www/micro_services/admin_contest/index.js",
        },
        {
            name: "Leaderboard",
            script: "/var/www/micro_services/leaderboard/index.js",
        },
        {
            name: "Team",
            script: "/var/www/micro_services/team/index.js",
        },
        {
            name: "Wallet",
            script: "/var/www/micro_services/wallet/index.js",
        },
        {
            name: "Verification",
            script: "/var/www/micro_services/verification/index.js",
        },
        {
            name: "Scorecard",
            script: "/var/www/micro_services/scorecard/index.js",
        },
        {
            name: "Winner",
            script: "/var/www/micro_services/winner/index.js",
        },

    ]
}

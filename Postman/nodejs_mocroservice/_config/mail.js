require('dotenv').config();
module.exports = {
    mailhostname: process.env.MAIL_HOSTNAME || 'smtp.gmail.com',
    mailport: process.env.MAIL_PORT || 587,
    mailuseremail: process.env.MAIL_USERNAME || '',
    mailuserpwd: process.env.MAIL_PASSWORD || '',
    mailfrom: process.env.MAIL_FROM || '',
    logoImage: process.env.APP_LOGO || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/1200px-Google_Chrome_icon_%28September_2014%29.svg.png',
    appName: process.env.APP_NAME || 'DQOT',
    infoMail: process.env.MAIL_USERNAME_INFO || '',
    contactNumber: process.env.APP_CONTACT || '9999999999',
};

require('dotenv').config();
module.exports = {
    s3: {
        username: process.env.AWS_USERNAME || '',
        bucket: process.env.AWS_BUCKET  || '',
        accessKey: process.env.AWS_ACCESS_KEY  || '',
        secretKey: process.env.AWS_SECRET_KEY  || '',
    }
};

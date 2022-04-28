const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const multerS3 = require('multer-s3');
const config = require("../_config/aws")
const AWS = require('aws-sdk');
const paths = require('path');

const s3 = new AWS.S3({
    accessKeyId: config.s3.accessKey,
    secretAccessKey: config.s3.secretKey,
});

let uploadFile = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.s3.bucket,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }

    }),
    limits: {fileSize: maxSize},
    fileFilter: (req, file, cb) => {
        const validExt = req.validFileExt.map(el => '.' + el);

        let ext = paths.extname(file.originalname);

        if (validExt.indexOf(ext) === -1) {
            req.fileError = 'File extension is invalid';
            return cb(null, false);
        }

        return cb(null, true);
    },
}).single('photo');

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;

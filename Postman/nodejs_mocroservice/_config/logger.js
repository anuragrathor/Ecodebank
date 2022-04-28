const {format} = require('winston');
const winston = require('winston');

const alignedWithColorsAndTime = format.combine(
    // format.colorize(),
    format.timestamp(),
    format.json(),
    // winston.format.prettyPrint(),
    format.align(),
    // format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
    level: 'info',
    format: alignedWithColorsAndTime,
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({filename: 'logs/info.log',}),
        new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
    ],
});

module.exports = logger;

const winston = require("winston");
const moment = require("moment")
const fs = require("fs")
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: `logs/info-${moment().format("DD-MM-YY")}.log`, level: 'info' }),
    ]
});

module.exports = logger
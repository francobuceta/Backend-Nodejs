import winston from 'winston';
import config from './config/config.js';   

let logger;

if (config.NODE_ENV === 'development') {
    logger = winston.createLogger({
        levels: {
            fatal: 0,
            error: 1,
            warning: 2,
            info: 3,
            http: 4,
            debug: 5
        },
        transports: [
            new winston.transports.Console({
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        ]
    });
} else {
    logger = winston.createLogger({
        levels: {
            fatal: 0,
            error: 1,
            warning: 2,
            info: 3,
            http: 4,
            debug: 5
        },
        transports: [
            new winston.transports.File({
                level: "info",
                format: winston.format.prettyPrint(),
                filename: "./errors.log",
                level: "error"
            })
        ]
    });
}

export default logger;
const winston = require("winston");

const logger = winston.createLogger({
    level : "info",
    format : winston.format.json(),
    defaultMeta : { service : 'project-service' },
    transports : [
        new winston.transports.File({ filename : 'v1/src/logs/projects/eror.log' , level : 'eror'}),
        new winston.transports.File({ filename : 'v1/src/logs/projects/info.log' , level : 'info'}),
        new winston.transports.File({ filename : 'v1/src/logs/projects/combined.log' }),
        // new winston.transport.Console(),  BU İFADE DOĞAL OLARAK KONSOLDA GÖSTERECEK 
    ]
});


module.exports = logger;
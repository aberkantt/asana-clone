const winston = require("winston");

const logger = winston.createLogger({
    level : "info",
    format : winston.format.json(),
    defaultMeta : { service : 'section-service' },
    transports : [
        new winston.transports.File({ filename : 'v1/src/logs/sections/eror.log' , level : 'eror'}),
        new winston.transports.File({ filename : 'v1/src/logs/sections/info.log' , level : 'info'}),
        new winston.transports.File({ filename : 'v1/src/logs/sections/combined.log' }),
        // new winston.transport.Console(),  BU İFADE DOĞAL OLARAK KONSOLDA GÖSTERECEK 
    ]
});


module.exports = logger;
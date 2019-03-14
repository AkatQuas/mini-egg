const config = require('../config');
const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: config.app.name,
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            path: `/var/tmp/${config.app.name}-error.log`
        }
    ]
});

module.exports = (app) => {
    app.logger = logger;
};

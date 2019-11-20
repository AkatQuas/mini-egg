const config = require('../config');
const createLogger = require('../lib/create-logger');

const logger = createLogger(
    config.app.name,
    [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            path: `/var/tmp/${config.app.name}-error.log`
        }
    ]
);

module.exports = (app) => {
    app.context.logger = logger;
};

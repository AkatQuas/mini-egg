const bunyan = require('bunyan');

const createLogger = (name, streams = []) => bunyan.createLogger({
  name,
  streams,
});

module.exports = createLogger;

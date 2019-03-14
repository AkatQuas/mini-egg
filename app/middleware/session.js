const session = require('koa-session');
const { middleware: config } = require('../config');

module.exports = app => session(config.session, app);

const { resolveApp } = require('../utils');
const { middleware: config } = require('../config');
const koaStatic = require('koa-static');

module.exports = koaStatic(resolveApp(config.static || 'public'));

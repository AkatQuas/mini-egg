const koaBody = require('koa-body');
const { middleware: config } = require('../config');

module.exports = koaBody({
    multipart: config.body.multipart,
    jsonLimit: config.body.jsonLimit || '3m',
    formLimit: config.body.formLimit || '10m',
    textLimit: config.body.textLimit || '3m'
});

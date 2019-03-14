const { resolveApp, fs, checkJsFile } = require('../utils');
const Router = require('koa-router');

module.exports = (app) => {
    const dir = resolveApp('router');
    const router = new Router({ prefix: '/api' });
    fs.readdirSync(dir)
        .filter(checkJsFile)
        .forEach(file => {
            const m = require(resolveApp('router', file));
            m(router, app.controller);
        });

    return router.routes();
};

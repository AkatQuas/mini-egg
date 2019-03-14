const Koa = require('koa');
const config = require('./config');

const loadLogger = require('./loader/logger');
const loadController = require('./loader/controller');
const loadService = require('./loader/service');

const routerMiddle = require('./middleware/router');
const sessionMiddle = require('./middleware/session');
const bodyMiddle = require('./middleware/body');
const staticMiddle = require('./middleware/static');

// koa app
const app = new Koa();
app.keys = config.app.keys;

// load context to app, controller, service, logger, model, etc
loadLogger(app);
loadController(app);
loadService(app);

// apply middleware, body, json, csrf, staticServer, etc
app.use(sessionMiddle(app));
app.use(bodyMiddle);
app.use(staticMiddle);

// add router
app.use(routerMiddle(app));

// app run
{
    const { name, port } = config.app;
    app.listen(port, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        app.logger.info(`🚀 ${name} running at http://localhost:${port}/`);
    });
}

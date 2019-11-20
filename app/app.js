const httpServer = require('http');
const Koa = require('koa');
const config = require('./config');

const loadLogger = require('./loader/logger');
const loadController = require('./loader/controller');
const loadService = require('./loader/service');

const routerMiddle = require('./middleware/router');
const sessionMiddle = require('./middleware/session');
const bodyMiddle = require('./middleware/body');
const staticMiddle = require('./middleware/static');
const websocket = require('./middleware/websocket');

module.exports = () => {
    // koa app
    const app = new Koa();
    app.keys = config.app.keys;

    // extend the context in app, mounting controller, service, logger, database connection, model, etc
    loadLogger(app);
    loadController(app);
    loadService(app);

    // apply middleware, body, json, csrf, staticServer, etc
    app.use(sessionMiddle(app));
    app.use(bodyMiddle);
    app.use(staticMiddle);

    // add router
    app.use(routerMiddle(app));

    // add websocket
    const server = httpServer.Server(app.callback());
    websocket(server);

    // app run or server run
    {
        const { name, port } = config.app;
        server.listen(port, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            app.logger.info(`🚀 ${name} running at http://localhost:${port}/, \n
        websocket on ws://localhost:${port}/,`);
        });
    }

    /*

    // if there is no websocket, we could just
    // run the following code, `app` listen to port
    // rather than `server` listen

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
    */
}
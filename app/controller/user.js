const Controller = require('../lib/controller.base');

class UserController extends Controller {
    async hello (ctx) {
        const { app } = this;
        const { who } = ctx.params;
        const { when } = ctx.query;
        app.logger.info('abc');
        ctx.body = await app.service.user.greet({
            who, when
        });
    }

    async world (ctx) {
        const { app } = this;
        const { who, when } = ctx.request.body;
        app.logger.info('world');
        ctx.body = await app.service.user.greet({ who, when });
    }
}

module.exports = UserController;

const Controller = require('../lib/controller.base');

class UserController extends Controller {
    async hello(ctx) {
        const { app } = this;
        const { who } = ctx.params;
        const { when } = ctx.query;
        app.logger.info('abc');
        ctx.body = await app.service.user.greet({
            who, when
        });
    }

    async world(ctx) {
        const { app } = this;
        const { who, when } = ctx.request.body;
        app.logger.info('world');
        ctx.body = await app.service.user.greet({ who, when });
    }

    async mongoCreate(ctx) {
        const { app } = this;
        app.logger.info('mongo user');
        ctx.body = await app.service.user.mongoCreate();
    }

    async mongoOne(ctx) {
        const { app } = this;
        const { uid } = ctx.params;
        ctx.body = await app.service.user.mongoOne(uid);
    }

    async mongoCase(ctx) {
        const { app } = this;
        const { uid } = ctx.query;

        ctx.body = await app.service.user.mongoCase(uid);
    }

    async addHobbies(ctx) {
        const { app } = this;
        const { uid, hobbies } = ctx.request.body;
        ctx.body = await app.service.user.addHobbies(uid, hobbies);
    }
}

module.exports = UserController;

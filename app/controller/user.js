const Controller = require('../core/controller.base');

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
        const { service, logger } = this.app;
        const { who, when } = ctx.request.body;
        logger.info('world');
        ctx.body = await service.user.greet({ who, when });
    }

    async mongoCreate(ctx) {
        const { logger, service } = this.app;
        logger.info('mongo user');
        ctx.body = await service.user.mongoCreate();
    }

    async mongoOne(ctx) {
        const { service } = this.app;
        const { uid } = ctx.params;
        ctx.body = await service.user.mongoOne(uid);
    }
    async mongoList(ctx) {
        const { service } = this.app;
        ctx.body = await service.user.userList();
    }
    async mongoCase(ctx) {
        const { service } = this.app;
        const { uid } = ctx.query;

        ctx.body = await service.user.mongoCase(uid);
    }

    async addHobbies(ctx) {
        const { service } = this.app;
        const { uid, hobbies } = ctx.request.body;
        ctx.body = await service.user.addHobbies(uid, hobbies);
    }

    async removeOne(ctx) {
        const { service } = this.app;
        const { uid } = ctx.params;
        console.log(uid);

        ctx.body = await service.user.removeOne(uid);
    }
}

module.exports = UserController;

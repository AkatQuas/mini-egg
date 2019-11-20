const Controller = require('../core/controller.base');

class UserController extends Controller {
    async hello(ctx) {
        const { who } = ctx.params;
        const { when } = ctx.request.query;
        ctx.logger.info('abc');
        ctx.body = await ctx.service.user.greet({
            who, when
        });
    }

    async world(ctx) {
        const { service, logger } = ctx;
        const { who, when } = ctx.request.body;
        logger.info('world');
        ctx.response.body = await service.user.greet({ who, when });
    }

    async mongoCreate(ctx) {
        const { logger, service } = ctx;
        logger.info('mongo user');
        ctx.response.body = await service.user.mongoCreate();
    }

    async mongoOne(ctx) {
        const { service } = ctx;
        const { uid } = ctx.params;
        ctx.response.body = await service.user.mongoOne(uid);
    }
    async mongoList(ctx) {
        const { service } = ctx;
        ctx.response.body = await service.user.userList();
    }
    async mongoCase(ctx) {
        const { service } = ctx;
        const { uid } = ctx.query;

        ctx.response.body = await service.user.mongoCase(uid);
    }

    async addHobbies(ctx) {
        const { service } = ctx;
        const { uid, hobbies } = ctx.request.body;
        ctx.response.body = await service.user.addHobbies(uid, hobbies);
    }

    async removeOne(ctx) {
        const { service } = ctx;
        const { uid } = ctx.params;
        console.log(uid);

        ctx.response.body = await service.user.removeOne(uid);
    }
}

module.exports = UserController;

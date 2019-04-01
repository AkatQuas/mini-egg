const Controller = require('../core/controller.base');
const { fs } = require('../utils');

class MiscController extends Controller {
  async heatmap(ctx) {
    const { service } = this.app;
    const { with_image: withImage = false, width, file } = ctx.request.query;
    ctx.response.type = 'image/png';
    const filename = await service.heatmap.findHeatmap({ withImage, width, file });
    ctx.body = fs.createReadStream(filename);
  }
}

module.exports = MiscController;

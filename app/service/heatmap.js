const heatmapStream = require('../lib/canvas-heatmap');
const config = require('../config.js');
const { resolveRoot, fs } = require('../utils');
const md5 = require('js-md5');

const md5dir = (name) => {
  const str = md5(name);
  const res = ['var'];
  for (let i = 0; i < 5; i += 2) {
    res.push(str[i] + str[i + 1]);
  }
  return res;
}

class HeatmapService {
  async generateHeatmap({ withImage, width, file }) {
    width = parseInt(width || 800);
    const height = width;
    const imageUrl = withImage ? `http://localhost:${config.app.port}/cute.png` : '';
    const data = new Array(250).fill(1).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      value: Math.random() * 100,
    }));
    const stream = await heatmapStream({
      imageUrl, width, height, data,
    });

    return new Promise(res => {
      const filename = (new Date() * 1) + '';
      const fullpath = resolveRoot(...md5dir(file), filename);
      const out = fs.createWriteStream(fullpath, { flags: 'wx+' });
      stream.pipe(out);
      out.on('finish', () => {
        console.log(`The PNG file was created. location: ${fullpath}`);
        res(fullpath);
      });
    });
  }
  async checkStats(file) {
    const dir3p = md5dir(file);
    const dir = resolveRoot(...dir3p);
    fs.ensureDirSync(dir);
    const files = fs.readdirSync(dir);
    if (!files.length) {
      return false;
    }
    const _file = files.reduce((a, b) => a > b ? a : b);
    const filename = resolveRoot(...dir3p, _file);
    const now = (new Date() * 1) - 600000;
    const stat = fs.statSync(filename);
    return stat.mtimeMs > now ? filename : false;
  }
  async findHeatmap({ width, withImage, file }) {
    const oldFile = await this.checkStats(file);
    return oldFile ? oldFile : this.generateHeatmap({ width, withImage, file });
  }

}

module.exports = HeatmapService;

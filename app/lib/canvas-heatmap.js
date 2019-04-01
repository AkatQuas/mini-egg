const { loadImage, createCanvas, Image } = require('canvas');

class SimpleHeat {
  constructor({
    width, height, gradient, minOpacity, maxValue, minValue, data,
  }) {
    this.width = parseInt(width || 500, 10);
    this.height = parseInt(height || 500, 10);
    this.radius = width / 100;
    this.gradient = gradient || {
      0.4: 'blue',
      0.6: 'cyan',
      0.7: 'lime',
      0.8: 'yellow',
      1.0: 'red',
    };
    this.minOpacity = minOpacity || 0.1;
    this.setData(data);

    this._calcMaxMin({ maxValue, minValue });
    this.canvas = this._createCanvas(this.width, this.height);
    this._circle = this._createBlurCircle(this.radius);
    this._gradData = this._createGradient(this.gradient);
  }
  setData(data) {
    if (!Array.isArray(data)) {
      throw new Error(`Parameter "data" must be an array, however got ${typeof data}`);
    }
    this.data = data;
    this._calcMaxMin({});
    return this;
  }
  setMaxValue(maxValue) {
    this.maxValue = parseFloat(maxValue);
    return this;
  }
  setMinValue(minValue) {
    this.minValue = parseFloat(minValue);
    return this;
  }
  setMinOpacity(minOpacity) {
    minOpacity = parseFloat(minOpacity);
    if (minOpacity >= 0.5) {
      throw new Error("What's wrong with you to set the minOpactiy bigger than 0.5, idiot?");
    }
    this.minOpacity = minOpacity <= 0.05 ? 0.05 : minOpacity;
    return this;
  }
  addData(item) {
    this.data.push(item);
    return this;
  }
  clearData() {
    this.data = [];
    return this;
  }
  drawHeat() {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.width, this.height);
    // draw a grayscale heatmap by putting a blurred circle at each data point
    {
      const r = this.radius * 1.75;
      const {
        maxValue, minValue, minOpacity, _circle,
      } = this;
      const gap = maxValue - minValue;

      this.data.forEach((p) => {
        // todo spread the plot
        ctx.globalAlpha = Math.min(Math.max((p.value - minValue) / gap, minOpacity), 1);
        ctx.drawImage(_circle, p.x - r, p.y - r);
      });
    }
    const greyScale = ctx.getImageData(0, 0, this.width, this.height);
    const colored = this._colorize(greyScale);

    ctx.putImageData(colored, 0, 0);

    return this;
  }
  toPNGStream(...args) {
    return this.canvas.createPNGStream(args);
  }
  toDataURL(...args) {
    return this.canvas.toDataURL(args);
  }

  _calcMaxMin({ maxValue, minValue }) {
    const { data } = this;
    if (!data) {
      throw Error('You should give me "data"');
    }
    const maxmin = data.reduce((mxmn, item) => {
      if (item.value > mxmn[0]) {
        mxmn[0] = item.value;
      }
      if (item.value < mxmn[1]) {
        mxmn[1] = item.value;
      }
      return mxmn;
    }, [-Infinity, +Infinity]);
    const max = maxValue || maxmin[0];
    const min = minValue || maxmin[1];
    this.setMaxValue(max);
    this.setMinValue(min);
    return this;
  }
  _createGradient(grad) {
    const canvas = this._createCanvas(1, 256);
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    Object.entries(grad).forEach((entry) => {
      gradient.addColorStop(+entry[0], entry[1]);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 256);
    const imageData = ctx.getImageData(0, 0, 1, 256);
    return imageData.data;
  }

  _createBlurCircle(radius) {
    // create a grayscale blurred circle image that we'll use for drawing points
    const blur = radius * 0.75;
    const r2 = radius + blur;
    const r2d = r2 * 2;
    const circle = this._createCanvas(r2d);
    const ctx = circle.getContext('2d');

    ctx.shadowOffsetX = r2d;
    ctx.shadowOffsetY = r2d;
    ctx.shadowBlur = blur;
    ctx.shadowColor = 'black';

    ctx.beginPath();
    ctx.arc(-r2, -r2, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    return circle;
  }

  _createCanvas(width, height) {
    if (height === undefined) {
      height = width;
    }
    return createCanvas(width, height);
  }
  _colorize(greyScale) {
    const grad = this._gradData;
    const grey = greyScale.data;
    for (let i = 0, len = grey.length, j; i < len; i += 4) {
      j = grey[i + 3] * 4; // get gradient color from opacity value

      if (j) {
        grey[i] = grad[j];
        grey[i + 1] = grad[j + 1];
        grey[i + 2] = grad[j + 2];
        // if you want to draw the heatmap with opacity, change the number 0.8
        grey[i + 3] = grey[i + 3] * 0.8;
      }
    }
    return greyScale;
  }
}

function _heatmap({
  data, width, height,
}) {
  const heatmap = new SimpleHeat({ width, height, data });
  return heatmap.drawHeat().toPNGStream();
}

function _heatmapWithMap({
  imageUrl,
  data,
  width,
  height,
}) {
  return loadImage(imageUrl).then((image) => {
    const ac = createCanvas(width, height);
    const ctx = ac.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);

    return new Promise((resolve) => {
      const img = new Image();
      const heatmap = new SimpleHeat({
        width, height, data,
      });
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(ac.createPNGStream());
      };
      img.onerror = (err) => { throw err; };
      img.src = heatmap.drawHeat().toDataURL();
    });
  });
}

const heatmapStream = ({
  imageUrl,
  data, width, height,
}) => (imageUrl ? _heatmapWithMap({
  imageUrl, data, width, height,
}) : _heatmap({ data, width, height }));

module.exports = heatmapStream;
module.exports.SimpleHeat = SimpleHeat;

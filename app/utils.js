const path = require('path');
const humps = require('humps');
const fs = require('fs-extra');

module.exports.resolveConf = (...dir) => path.resolve(__dirname, '../config', ...dir);

module.exports.resolveApp = (...dir) => path.resolve(__dirname, '../app', ...dir);

module.exports.camelize = (string) => humps.camelize(string);

module.exports.decamelize = (string) => humps.decamelize(string);

module.exports.fs = fs;

const jsReg = /\.js$/;
module.exports.checkJsFile = file => jsReg.test(file);

// bind controller so that we can access to this after koa-router
module.exports.bindController = self => {
    const properties = Object.getOwnPropertyNames(self.constructor.prototype);
    const l = properties.length;
    properties.forEach(key => {
        const ori = self[key];
        if (key !== 'constructor' && typeof ori === 'function') {
            self[key] = ori.bind(self);
        }
    });
    return self;
};

const { resolveConf } = require('./utils');
const merge = require('deepmerge');
const isProd = process.env.NODE_ENV === 'production';

const common = require(resolveConf('config'));

let config = common;
if (!isProd) {
    try {
        const local = require(resolveConf('config.local.js'));
        config = merge(common, local);
    } catch (error) {
        console.log('In development, local config not found, skipping...');
    }
} else {
    try {
        const prod = require(resolveConf('config.prod.js'));
        config = merge(common, prod);
    } catch (error) {
        console.log('In production, production config not found, skipping...');
    }
}

module.exports = config;

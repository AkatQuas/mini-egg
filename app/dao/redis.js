const Redis = require('ioredis');
const { redis: redisConf, app } = require('../config');

const redisKeyPrefix = `${app.name}__`;

const redis = new Redis(redisConf);

const myRedis = Object.assign({}, redis);
myRedis.set = async (key, val, expired = 5400) => {
    key = redisKeyPrefix + key;
    const res = await redis.set(key, val, 'EX', expired);
    return res;
};
myRedis.get = async key => {
    key = redisKeyPrefix + key;
    const res = await redis.get(key);
    return res;
};

module.exports = myRedis;

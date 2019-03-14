const mongoose = require('mongoose');
const oid  = mongoose.Types.ObjectId;
const { mongo: config } = require('../../config');
const createModels = require('./models');

const mongo_conn = mongoose.createConnection(config.uri);

const models = createModels(mongo_conn);

module.exports.models = models;

module.exports.getUser = (id) => {
  return models.users.findOne({ _id: oid(id) })
}

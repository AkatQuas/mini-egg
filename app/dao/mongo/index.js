const mongoose = require('mongoose');
const oid = mongoose.Types.ObjectId;
const { mongo: config } = require('../../config');

const mongo_conn = mongoose.createConnection(config.uri);

const modelLoader = require('./model.loader');

const models = modelLoader(mongo_conn);

module.exports.models = models;

// if you want it to be the mongo loader registered in the `app`,
// just tweak the exported module as you like

/*
module.exports.mongoLoader = (app) => {
  app.mongo = {
    models
  };
}
 */

// todo, you can move these dao functions to other files
// to reduce the size or maintain the robust
module.exports.getUser = (id) => {
  return models.User.findOne({ _id: oid(id) })
}

module.exports.getUserCaseList = async (uid) => {
  const raw = await models.User.findOne({ _id: oid(uid) }, { _id: 0 }).lean();
  return raw.cases;
}

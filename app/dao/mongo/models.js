const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemas = (() => {
  const users = new Schema({
    first_name: String,
    last_name: String,
    age: Number,
    created_at: Date,
    updated_at: Date,
  });

  return {
    users
  }
})();

module.exports = (conn) => {
  const keys = Object.keys(schemas);
  const m = {
    users: null
  };
  keys.forEach(key => {
    const sch = schemas[key];
    m[key] = conn(key, sch);
  });
  return m;
}
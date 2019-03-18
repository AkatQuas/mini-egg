const { resolveApp, fs, checkJsFile } = require('../../utils');
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = (conn) => {
  function preSave(next) {
    const now = Date.now();
    this.created_at = now;
    this.updated_at = now;
    next();
  }

  function preUpdate(next) {
    this.options.runValidators = true;
    this.update({}, { $set: { updated_at: Date.now() } });
    next();
  }

  // the path to model can be more flexible
  const modelDirRaw = 'dao/mongo/model';
  return fs.readdirSync(resolveApp(modelDirRaw))
    .filter(checkJsFile)
    .reduce((models, file) => {
      const modelCreator = require(resolveApp(modelDirRaw, file));
      const model = modelCreator(Schema);

      const { name, schema, index, methods, virtuals } = model;
      const model_schema = new Schema(schema);

      model_schema
        .pre('save', preSave)
        .pre('update', preUpdate)
        .pre('findOneAndUpdate', preUpdate);
      if (index && index.length) {
        index.forEach((indexConfig) => {
          model_schema.index(indexConfig.fields, indexConfig.options);
        });
      }
      if (methods) {
        model_schema.method(methods);
      }
      if (virtuals) {
        virtuals.forEach(virt => {
          const v = model_schema.virtual(virt.name).get(virt.get);
          if (virt.set) {
            v.set(virt.set);
          }
        });
      }
      model_schema.on('index', (err) => {
        if (err) {
          console.error(`Model ${name} index loaded with failer`, err);
        } else {
          console.log(`Model ${name} index loaded`)
        }
      })

      models[name] = conn.model(name, model_schema);
      return models;
    }, {});
};

const { resolveApp, camelize, fs, checkJsFile } = require('../utils');

module.exports = (app) => {
    const dir = resolveApp('service');

    app.service = fs.readdirSync(dir)
        .filter(checkJsFile)
        .reduce((ser, file) => {
            const name = camelize(file.replace('.js', ''));
            const Service = require(resolveApp('service', file));
            ser[name] = new Service(app);
            return ser;
        }, {});
};

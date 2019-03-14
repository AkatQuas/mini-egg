const { resolveApp, camelize, fs, checkJsFile } = require('../utils');

module.exports = (app) => {
    const dir = resolveApp('controller');

    app.controller = fs.readdirSync(dir)
        .filter(checkJsFile)
        .reduce((con, file) => {
            const name = camelize(file.replace('.js', ''));
            const Controller = require(resolveApp('controller', file));
            con[name] = new Controller(app);
            return con;
        }, {});
};

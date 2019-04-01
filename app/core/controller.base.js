const { bindController } = require('../utils');

class Controller {
    constructor (app) {
        this.app = app;
        bindController(this);
    }
}

module.exports = Controller;

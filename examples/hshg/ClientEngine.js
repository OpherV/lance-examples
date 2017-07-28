const ClientEngine = require('lance-gg').ClientEngine;
const SpaaaceRenderer = require('./SpaaaceRenderer');
const KeyboardControls = require('lance-gg').controls.Keyboard;

class SpaaaceClientEngine extends ClientEngine {

    constructor(gameEngine, options) {
        super(gameEngine, options, SpaaaceRenderer);

        this.serializer.registerClass(require('./Circle'));
    }
}

module.exports = SpaaaceClientEngine;

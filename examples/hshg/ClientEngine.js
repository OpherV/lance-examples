const ClientEngine = require('lance-gg').ClientEngine;
const Renderer = require('./renderer');
class clientEngine extends ClientEngine {

    constructor(gameEngine, options) {
        super(gameEngine, options, Renderer);

        this.serializer.registerClass(require('./Rect'));
    }
    
}

module.exports = clientEngine;

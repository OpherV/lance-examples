const SimplePhysicsEngine = require('lance-gg').physics.SimplePhysicsEngine;
const GameEngine = require('lance-gg').GameEngine;
const TwoVector = require('lance-gg').serialize.TwoVector;

class SpaaaceGameEngine extends GameEngine {

    constructor(options) {
        super(SimplePhysicsEngine, options);
    }

    start() {
        super.start();

        this.worldSettings = {
            worldWrap: true,
            width: 500,
            height: 500
        };

    };

}

module.exports = SpaaaceGameEngine;
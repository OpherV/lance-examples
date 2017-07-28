const SimplePhysicsEngine = require('lance-gg').physics.SimplePhysicsEngine;
const GameEngine = require('lance-gg').GameEngine;
const Rect = require("./Rect");

class TestGameEngine extends GameEngine {

    constructor(options) {
        super(options);
        this.physicsEngine = new SimplePhysicsEngine({
            gameEngine: this,
            collisionOptions: {
                type: 'HSHG'
            }
        });
    }

    start() {
        super.start();

        this.worldSettings = {
            worldWrap: true,
            width: 500,
            height: 500
        };

        for(let x=0; x<20; x++) {
            let rect = new Rect(x);
            rect.position.x = Math.round(Math.random() * this.worldSettings.width);
            rect.position.y = Math.round(Math.random() * this.worldSettings.height);
            rect.velocity.x = Math.random() * 2 - 1;
            rect.velocity.y = Math.random() * 2 - 1;

            rect.width = 10 + Math.round(Math.random() * 20);
            rect.height = 10 + Math.round(Math.random() * 20);

            this.addObjectToWorld(rect);
        }

    };

}

module.exports = TestGameEngine;
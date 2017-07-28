const ClientEngine = require('./ClientEngine');
const GameEngine = require('./GameEngine');

const options  = {
    standaloneMode: true
};

// create a client engine and a game engine
const gameEngine = new GameEngine(options);
const clientEngine = new ClientEngine(gameEngine, options);

clientEngine.start();

const SpaaaceClientEngine = require('./ClientEngine');
const SpaaaceGameEngine = require('./SpaaaceGameEngine');

// default options, overwritten by query-string options
// is sent to both game engine and client engine
const options  = {
    standaloneMode: true
};

// create a client engine and a game engine
const gameEngine = new SpaaaceGameEngine(options);
const clientEngine = new SpaaaceClientEngine(gameEngine, options);

clientEngine.start();

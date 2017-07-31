import TestClientEngine from './TestClientEngine';
import TestGameEngine from './TestGameEngine';

const options  = {
    standaloneMode: true
};

// create a client engine and a game engine
const gameEngine = new TestGameEngine(options);
const clientEngine = new TestClientEngine(gameEngine, options);

clientEngine.start();

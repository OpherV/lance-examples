import ClientEngine from 'lance/ClientEngine';
import TestRenderer from './TestRenderer';
import Rect from './Rect';

export default class TestClientEngine extends ClientEngine {

    constructor(gameEngine, options) {
        super(gameEngine, options, TestRenderer);

        this.serializer.registerClass(Rect);
    }
    
}

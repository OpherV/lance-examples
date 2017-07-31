import 'pixi.js';
import Renderer from 'lance/render/Renderer'

export default class TestRenderer extends Renderer {

    get ASSETPATHS() {
        return {
            // ship: 'assets/ship1.png',
            // missile: 'assets/shot.png',
            // bg: 'assets/space3.png',
            // smokeParticle: 'assets/smokeparticle.png'
        };
    }

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.sprites = {};
        this.isReady = false;

        this.gameEngine.on('collisionStart', collisionPair => {
            this.drawObj(collisionPair.o1 , 0xFF0000);
            this.drawObj(collisionPair.o2 , 0xFF0000);
        });

        this.gameEngine.on('collisionStop', collisionPair => {
            this.drawObj(collisionPair.o1 , 0xFFFF00);
            this.drawObj(collisionPair.o2 , 0xFFFF00);
        });
    }

    init() {
        if (this.initPromise) return this.initPromise;

        this.viewportWidth = window.innerWidth;
        this.viewportHeight = window.innerHeight;
        this.stage = new PIXI.Container();
        

        if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') {
            this.onDOMLoaded();
        } else {
            document.addEventListener('DOMContentLoaded', ()=>{
                this.onDOMLoaded();
            });
        }

        this.initPromise = new Promise((resolve, reject)=>{
            let onLoadComplete = () => {
                this.isReady = true;
                resolve();
            };

            let resourceList = Object.keys(this.ASSETPATHS).map( x => {
                return {
                    name: x,
                    url: this.ASSETPATHS[x]
                };
            });

            // make sure there are actual resources in the queue
            if (resourceList.length > 0)
                PIXI.loader.add(resourceList).load(onLoadComplete);
            else
                onLoadComplete();
        });

        return this.initPromise;
    }

    onDOMLoaded() {
        this.renderer = PIXI.autoDetectRenderer(this.viewportWidth, this.viewportHeight);
        document.body.querySelector('.pixiContainer').appendChild(this.renderer.view);
    }

    draw() {
        super.draw();

        if (!this.isReady) return; // assets might not have been loaded yet
        for (let objId of Object.keys(this.sprites)) {
            let objData = this.gameEngine.world.objects[objId];
            let sprite = this.sprites[objId];

            if (objData) {
                sprite.x = objData.position.x;
                sprite.y = objData.position.y;
            }
        }
        this.renderer.render(this.stage);
    }

    drawObj(objData, color){
        let sprite = this.sprites[objData.id];
        sprite.clear();
        sprite.beginFill(color);
        sprite.drawRect(0, 0, objData.width, objData.height);
        sprite.endFill();
    }

    addObject(objData) {
        let sprite= new PIXI.Graphics();
        sprite.position.set(objData.position.x, objData.position.y);
        this.stage.addChild(sprite);

        this.sprites[objData.id] = sprite;

        this.drawObj(objData, 0xFFFF00);

        return sprite;
    }

    removeObject(obj) {
        console.log('remove obj', obj);

        let sprite = this.sprites[obj.id];
        if (sprite) {
            this.sprites[obj.id].destroy();
            delete this.sprites[obj.id];
        }
    }

}

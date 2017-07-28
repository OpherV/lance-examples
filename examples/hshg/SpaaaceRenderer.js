const PIXI = require('pixi.js');
const Renderer = require('lance-gg').render.Renderer;

class SpaaaceRenderer extends Renderer {

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
    }

    init() {
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

        return new Promise((resolve, reject)=>{
            PIXI.loader.add(Object.keys(this.ASSETPATHS).map( x => {
                return {
                    name: x,
                    url: this.ASSETPATHS[x]
                };
            }))
                .load(() => {
                    this.isReady = true;
                    this.setupStage();
                    resolve();
                });
        });
    }

    onDOMLoaded() {
        this.renderer = PIXI.autoDetectRenderer(this.viewportWidth, this.viewportHeight);
        document.body.querySelector('.pixiContainer').appendChild(this.renderer.view);
    }

    setupStage() {

        this.bg = new PIXI.extras.TilingSprite(
            PIXI.loader.resources.bg.texture,
            this.gameEngine.worldSettings.width,
            this.gameEngine.worldSettings.width);

        this.layer1.addChild(this.bg);
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

    addObject(objData) {
        let sprite;

        sprite.position.set(objData.position.x, objData.position.y);
        this.stage.addChild(sprite);

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

module.exports = SpaaaceRenderer;

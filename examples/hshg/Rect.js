const DynamicObject = require('lance-gg').serialize.DynamicObject;

class Circle extends DynamicObject {

    constructor(id, position) {
        super(id, position);
        this.class = Circle;
    };

}

module.exports = Circle;

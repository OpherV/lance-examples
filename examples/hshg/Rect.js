import DynamicObject from 'lance/serialize/DynamicObject'

export default class Circle extends DynamicObject {

    constructor(id, position) {
        super(id, position);
        this.class = Circle;
    };

}
import { GameObject } from './GameObject.js';
const defPadding = 0;

export class Sprite extends GameObject {
    constructor(x, y, image, padding) {
        super(x, y);
        this.image = image;
        this.padding = padding || defPadding;
    }

    draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }

    metHor(obj) {
		return this.y - this.padding < obj.y + obj.image.height - obj.padding &&
        this.y + this.image.height - this.padding > obj.y + obj.padding;
	}

	metVer(obj) {
		return this.x + this.padding < obj.x + obj.image.width - obj.padding &&
            this.x + this.image.width - this.padding > obj.x + obj.padding;
    }
    
    collide(obj) {
        var metHor = this.metHor(obj)
        var metVer = this.metVer(obj);
        return metHor && metVer;
    }
}
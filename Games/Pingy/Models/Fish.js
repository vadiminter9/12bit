import { Sprite } from './Sprite.js';
import { fishImage } from '../Images.js';

export class Fish extends Sprite {
	constructor(x, y) {
        super(x, y, fishImage)
    }

    rutine = function() {
        if (this.collide(this.game.player)) {
            this.game.player.updateFishes();
            this.deleteMe();
        }
    }
}
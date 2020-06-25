import { Sprite } from './Sprite.js';
import { finishImage } from '../Images.js';

export class Finish extends Sprite {

	constructor(x, y) {
		super(x, y, finishImage)
	}
	
	rutine = function(){
		if (this.collide(this.game.player)){
			this.game.completeLevel();
		}
	}
}

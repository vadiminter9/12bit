import { Sprite } from './Sprite.js';
import { orangeHeartImage, blueHeartImage, blackHeartImage } from '../Images.js';

const heartPadding = 2;
export class Heart extends Sprite {

	constructor(x, y, heartImage, box) {
		super(x, y, heartImage, heartPadding)
		this.box = box;
	}
	
	rutine = function(){
		if (this.box != null) {
			this.x = this.box.x + Math.floor(this.box.image.width / 2) - Math.floor(this.image.width / 2);
			this.y = this.box.y + this.box.image.height - this.image.height;
		}

		if (this.collide(this.game.player)){
			this.act();
			this.deleteMe();
		}
	}
}

export class OrangeHeart extends Heart {

	constructor(x, y, box) {
		super(x, y, orangeHeartImage, box);
	}

	act = function() {
		this.game.player.maxLivesCount++;
		this.game.player.livesCount++;
	}
}

export class BlueHeart extends Heart {

	constructor(x, y, box) {
		super(x, y, blueHeartImage, box);
	}

	act = function() {
		this.game.player.maxLivesCount++;
	}
}

export class BlackHeart extends Heart {

	constructor(x, y, box) {
		super(x, y, blackHeartImage, box);
	}

	act = function() {
		this.game.player.handleHarm(this);
		this.game.player.maxLivesCount--;
	}
}

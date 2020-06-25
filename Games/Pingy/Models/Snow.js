import { Sprite } from './Sprite.js';
import { snowImage } from '../Images.js';

const minSpeed = 0.2;
const maxSpeed = 1;

export class Snow extends Sprite {

	constructor(camera, game) {
		var x = getRandomNumber(camera.x - canvas.width, camera.x + 2 * canvas.width);
		super(x, -canvas.height, snowImage);
		this.game = game;

		this.speedy = getRandomNumber(minSpeed, maxSpeed);
		this.speedx = getRandomNumber(-0.5, 0.5);
	}
	
	rutine = function(){
		this.y += this.speedy;
		this.x += this.speedx;

		if (this.x < this.game.camera.x - this.game.ctx.canvas.width || this.y > 140) {
			this.deleteMe();
		}
	}
}

function getRandomNumber(min, max) {
	return Math.random() * (max - min) + min;
}



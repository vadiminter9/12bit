import { Sprite } from './Sprite.js';
import { switchImages } from '../Images.js';
import { shot } from '../Controls.js';

const framesPerImage = 3;

export class Switch extends Sprite {

	constructor(x, y, target, targetX, targetY) {
		super(x, y, switchImages[0]);
		this.value = false;
		this.target = target;
		this.targetInitialX = target.x;
		this.targetInitialY = target.y;
		this.targetX = targetX;
		this.targetY = targetY;
		this.position = 0;
		this.frame = 0;
		this.switching = false;
	}
	
	rutine = function(){
		if (this.collide(this.game.player) && this.game.controls[shot] && !this.switching) {
			this.switching = true;
			this.targetValue = !this.value;
		}

		if (this.switching) {
			this.frame++;

			if (this.frame > framesPerImage) {
				this.targetValue ? this.position++ : this.position--;
				this.frame = 0;
			} 

			if ((this.targetValue && this.position >= switchImages.length - 1) || (!this.targetValue && this.position <= 0)) {
				this.switching = false;
				this.value = this.targetValue;
			}

			this.image = switchImages[this.position];
		}

		if (this.value) {
			if (this.target.x != this.targetX) {
				this.target.x = this.targetX > this.target.x ? this.target.x + 1 : this.target.x - 1;
			}

			if (this.target.y != this.targetY) {
				this.target.y = this.targetY > this.target.y ? this.target.y + 1 : this.target.y - 1;
			}
		} else {
			if (this.target.x != this.targetInitialX) {
				this.target.x = this.targetInitialX > this.target.x ? this.target.x + 1 : this.target.x - 1;
			}

			if (this.target.y != this.targetInitialY) {
				this.target.y = this.targetInitialY > this.target.y ? this.target.y + 1 : this.target.y - 1;
			}
		}
	}
}

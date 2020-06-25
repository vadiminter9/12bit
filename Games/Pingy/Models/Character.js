import { Sprite } from './Sprite.js';
import { SnowBall } from './SnowBall.js';
import { snowBallImage } from '../Images.js';

const g = 20;

export class Character extends Sprite {
	constructor(x, y, image) {
        super(x, y, image);
        this.direction = 'left';
        this.harmIndex = 0;
		this.livesCount = 5;
		this.maxLivesCount = 5;
		this.shotTime = 1000;
		this.lastShot = 0;
		this.platform = null;
		this.speedy = 0;
		this.speedX = 0;
    }

	rutine = function (dt) {
		if (this.platform !== null){
			this.speedy = 0;

			if (!this.metVer(this.platform)) {
				this.platform = null;
			}
		}
		

		if (this.platform === null){
			this.y += this.speedy; 
			this.speedy += g * dt / 1000; 
		}

		if (this.isHarmed) {
			this.showHarm = this.harmIndex % 6 > 3;
			this.harmIndex++;

			if (this.harmIndex > 50) {
				this.harmIndex = 0;
				this.isHarmed = false;
			}
		}

		this.act();
	}

	act = function () {
	}

	handleHarm = function () {
		if (this.isHarmed) 
		{
			return;
		}

		this.livesCount--;
		
		this.speedy = -3;
		this.platform = null;
		
		if (this.livesCount > 0) {
			this.isHarmed = true;
		} else {
			this.killMe();
		}
	}

	jump = function() {
		const jumpHeight = 25;
		if (this.platform != null) {
			this.jumpInitialY = this.platform.y;
			this.platform = null;
		} else if (this.speedy >= 0) {
			return;
		}
		if (this.speedy <= 0 && this.y + this.image.height > this.jumpInitialY - jumpHeight && this.speedy > -5) {
			this.speedy -= 1;
			if (this.speedy < -5) {
				this.speedy = -5;
			}
		}
	}

	shot = function (shotSpeedX, shotSpeedY) {
		const now = new Date();
		let directionKoef = this.direction == "right" ? -1 : 1;

		if (now - this.lastShot > this.shotTime) {
            var x = this.direction == "right" ? this.x + this.image.width : this.x - snowBallImage.width;
			this.game.objects.push(new SnowBall(x, this.y, this.game, shotSpeedX * directionKoef, shotSpeedY));
			this.lastShot = now;
        }
	}

	killMe = function () {
		this.deleteMe();
	}
}

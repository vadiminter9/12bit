import { Character } from './Character.js';
import { pingyImage } from '../Images.js';
import { left, right, jump, shot } from '../Controls.js';
import { Switch } from './Switch.js';

const speedX = 2;
const speedXStep = 0.15;
const normalSpeedY = 4;
const pingyPadding = 2;
const livesCount = 5;
const maxLivesCount = 5;

export class Player extends Character {

	constructor(x, y) {
		super(x, y);
		this.speedy = 0;
		this.speedX = 0;
		this.collidedWithWall = false;

		this.animationLine = 3;
		this.lineHeight = 25;
		this.frameIndex = 0;
		this.tickCount = 0;
		this.ticksPerFrame = 1;
		this.numberOfFrames = 12;
		this.totalWidth = 168;

		this.padding = pingyPadding;
		this.image = {};
		this.image.width = this.totalWidth / this.numberOfFrames;
		this.image.height = this.lineHeight;
		this.animationImage = pingyImage;

		this.isHarmed = false;
		this.showHarm = false;
		this.harmIndex = 0;

		this.direction = "right";
		this.shotTime = 400;

		this.scores = 0;
		this.fishesCount = 0;

		this.shotSpeedX = -4;
		this.shotSpeedY = -1;
	}

	run = function() {

		if (this.game.controls[left] == true && this.speedX > -speedX){
			this.speedX += -speedXStep;
			this.direction = "left";
		}
		
		if (this.game.controls[right] == true && this.speedX < speedX){
			this.speedX += speedXStep;
			this.direction = "right";
		}

		if (!this.game.controls[right] && !this.game.controls[left] && this.speedX != 0){
			this.speedX = this.speedX > 0 ?  this.speedX - speedXStep : this.speedX + speedXStep;

			if (Math.abs(this.speedX) < speedXStep) {
				this.speedX = 0;
			}
		}

		this.x = Math.round(this.x += this.speedX);
	};

	act = function () {
		this.run();

		if (this.game.controls[jump]) {
			this.jump();
		}

		
		if (this.game.controls[shot] && !this.game.objects.some(x => x instanceof Switch && x.collide(this))) {
			this.shot(this.shotSpeedX, this.shotSpeedY);
		}
	}

	killMe = function () {
		this.game.gameOver();
	}

	updateFishes = function() {
		this.fishesCount++;
		this.scores++;

		if (this.fishesCount >= 5) {
			if (this.livesCount < this.maxLivesCount) {
				this.livesCount++;
			} else {
				this.scores = this.scores + 10;
			}

			this.fishesCount = 0;
		}
	}
	
    draw = function(ctx) {
		this.tickCount += 1;

		this.prevAnimationLine = this.animationLine;

		if (this.game.controls[left]){
			this.animationLine = 0;
			this.ticksPerFrame = 1;
			this.numberOfFrames = 12

		}

		if (this.game.controls[right]) {
			this.animationLine = 1;
			this.ticksPerFrame = 1;
			this.numberOfFrames = 12
		}
		
		if (!this.game.controls[left] && !this.game.controls[right]) {
			if (this.animationLine == 2 || this.prevAnimationLine == 0) {
				this.animationLine = 2;
			} else {
				this.animationLine = 3;
			}
			this.ticksPerFrame = 10;
			this.numberOfFrames = 2;
			if (this.frameIndex == 0 && Math.random() > 0.1) {
				this.tickCount--;
			};
		}

		if (this.prevAnimationLine != this.animationLine) {
			this.tickCount = 0;
			this.frameIndex = 0;
		}
	

		if (this.tickCount > this.ticksPerFrame) {

			this.tickCount = 0;
			
			// If the current frame index is in range
			if (this.frameIndex < this.numberOfFrames - 1) {	
				// Go to the next frame
				this.frameIndex += 1;
			} else {
				this.frameIndex = 0;
			}
		}

		ctx.drawImage(
		    this.animationImage,
		    this.frameIndex * this.image.width,
		    this.animationLine * this.image.height,
		    this.image.width,
		    this.image.height,
		    this.x,
		    this.y,
		    this.image.width,
			this.image.height);
	};
};
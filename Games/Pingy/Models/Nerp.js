import { Character } from './Character.js';
import { nerpImage } from '../Images.js';

export class Nerp extends Character {
	constructor(x, y) {
        super(x, y, nerpImage);
        this.tickCount = 0;
        this.tickPerFrame = 5;
        this.frameIndex = 0;
        this.numberOfFrames = 8;
        this.lineHeight = 25;

        this.image = {}
        this.image.width = 40;
        this.image.height = this.lineHeight;
        this.animationImage = nerpImage;

        this.animationLine = 0;
        
        this.x0 = x;
        this.x1 = x + 100;
        this.dx = 0.4;
    }

    act = function () {
        if (this.x < this.x0) {
            this.dx = 0.4;
            this.animationLine = 0;
        }

        if (this.x >this.x1) {
            this.dx = -0.4;
            this.animationLine = 1;
        }
        this.x = this.x + this.dx;

        if (this.collide(this.game.player)) {
            this.game.player.handleHarm();
        }
    }

    draw = function(ctx) {
        this.tickCount++;

        if (this.tickCount > this.tickPerFrame) {
            this.tickCount = 0;
            this.frameIndex++;

            if (this.frameIndex == this.numberOfFrames - 1) {
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
    }
}

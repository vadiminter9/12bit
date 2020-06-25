import { Sprite } from './Sprite.js';
import { platformImage } from '../Images.js';

export class Platform extends Sprite {
	constructor(x, y, type) {
        super(x, y, platformImage[type])
    }

    rutine = function () {
        if (this.collide(this.game.player)) {
            var vasVerthandled = this.handleVertCollision();
            
            if (vasVerthandled) {
                return;
            }

            if (this.game.player.y + this.game.player.image.height != this.y + this.image.height) {
                this.handleHorCollision();
            }
        } 
    }

    handleVertCollision = function () {
        if (this.game.player.speedy < 0) {
            var dy = this.game.player.y - (this.y + this.image.height);
            if (Math.abs(dy) <= Math.abs(this.game.player.speedy) + this.game.player.padding) {
                this.game.player.speedy = 0;
                this.game.player.y = this.y + this.image.height;
                return true;
            }
        }
    }

    handleHorCollision = function () {
        if (this.game.player.speedX > 0) {
            this.game.player.x = this.x - this.game.player.image.width + this.game.player.padding;
        }

        if (this.game.player.speedX < 0) {
            this.game.player.x = this.x + this.image.width - this.game.player.padding ;
        }

        this.game.player.speedX = 0;
    }
}
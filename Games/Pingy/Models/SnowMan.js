import { snowmanImage, snowBallImage } from '../Images.js';
import { Character } from './Character.js';

export class SnowMan extends Character {
	constructor(x, y, game) {
        super(x, y, snowmanImage);
        this.direction = 'left';
        this.harmIndex = 0;
        this.livesCount = 3;
        this.shotSpeedX = 6;
		this.shotSpeedY = -1;
    }

    act = function() {
        if (this.collide(this.game.player)) {
            this.game.player.handleHarm();
        }
        
        let player = this.game.player;

        let shotSpeedX = -this.shotSpeedX * (this.shotSpeedX / Math.abs(this.shotSpeedX));

        let dx = player.x - this.x;
        let dy = player.y - this.y;

        let shotSpeedY = dy / Math.abs(dx) * this.shotSpeedX;

        if (Math.abs(dx) < 55) {
            shotSpeedY += 1;
        }

        if (Math.abs(dx) > 65) {
            shotSpeedY -= 1;
        }

        if (dx < 0) {
            this.direction = 'left';
        } else {
            this.direction = 'right';
        }

        this.shot(shotSpeedX, shotSpeedY);
    }
}

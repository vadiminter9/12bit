import { Platform } from './Platform.js';
const WallPlatformImageType = 3;

export class Wall extends Platform {
	constructor(x, y) {
        super(x, y, WallPlatformImageType)
    }

    rutine = function () {
        if (this.collide(this.game.player)) {
            this.game.player.handleHarm();
        }
    }
}

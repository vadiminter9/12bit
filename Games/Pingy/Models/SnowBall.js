import { snowBallImage } from '../Images.js';
import { Sprite } from './Sprite.js';
import { Wall } from './Wall.js';
import { IceBox } from './IceBox.js';
import { Platform } from './Platform.js';
import { Character } from './Character.js';

export class SnowBall extends Sprite {
	constructor(x, y, game, speedx, speedy) {
        super(x, y, snowBallImage)
        this.game = game;
        this.padding = 2;
        this.speedy = speedy;
        this.speedx = speedx
    }

    rutine = function (dt) {
        this.move(dt);
        this.checkCollide();
    }

    move = function (dt) {
        this.y += this.speedy; 
        
        const g = 10;
        this.speedy += g * dt / 1000; 

        this.x += this.speedx;
    }

    checkCollide = function () {
        var target = this.game.objects.find(x => (x instanceof Wall ||
            x instanceof IceBox ||
            x instanceof Platform ||
            x instanceof Character) &&
            this.collide(x));

        if (target) {
            if (target instanceof Character) {
                target.handleHarm(this);
            }

            this.game.objects.splice(this.game.objects.indexOf(this), 1);
        }
    }
}

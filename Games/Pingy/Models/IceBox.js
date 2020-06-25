import { Platform } from './Platform.js';

const IceBoxPlatformImageType = 2;
const glideSpeedStep = 0.1;
export class IceBox extends Platform {
	constructor(x, y) {
        super(x, y, IceBoxPlatformImageType)
        this.platform = null;
        this.speedy = 0;
        this.glideSpeed = 0;
    }

    push = function () {
        if (this.game.player.speedX > 0) {
            this.x = this.game.player.x + this.game.player.image.width - this.game.player.padding;
        }

        if (this.game.player.speedX < 0) {
            this.x = this.game.player.x - this.image.width + this.game.player.padding;
        }
        
        this.glideSpeed = this.game.player.speedX;
    }

    rutine = function (dt) {

        if (this.platform !== null){
			this.speedy = 0;
			
			if (!this.metVer(this.platform)) {
				this.platform = null;
			}
		}

        this.checkBoxCollisions();

        if (Math.abs(this.glideSpeed) < glideSpeedStep) {
            this.glideSpeed = 0;
            this.x = Math.round(this.x);
        }

        this.x += this.glideSpeed;
        
        if (this.platform === null){
            this.y += this.speedy; 
            
            const g = 20;
			this.speedy += g * dt / 1000; 
        }

        if (this.collide(this.game.player)) {
            this.checkPush();
        } else {
            if (this.glideSpeed > 0) {
                this.glideSpeed -= glideSpeedStep;
            } 
            if (this.glideSpeed < 0) {
                this.glideSpeed += glideSpeedStep;
            }
        }
    }

    checkBoxCollisions = function () {
        if (this.glideSpeed != 0) {
            var boxes = this.game.objects.filter(x => x instanceof Platform && x != this);
            boxes.forEach((box) => {
				if (this.collide(box)) {
					this.glideSpeed = 0;
					if (this.x > box.x) {
						this.x = box.x + this.image.width;
					} else {
						this.x = box.x - this.image.width;
					}
				}
			});
        }
    }

    checkPush = function () {
		var canBeMovedHor = true;
		var noBoxOnTop = true;

        var initialX = this.x;
        var initialY = this.y;
        var iceboxes = this.game.objects.filter(o => (o instanceof IceBox) && o != this);
        var walls = this.game.objects.filter(o => (o instanceof Platform) && o != this);

        this.y = this.y - this.image.height;
        noBoxOnTop = !iceboxes.some(ib => this.collide(ib));
        this.y = initialY;

        var direction = this.game.player.speedX > 0 ? "right" : "left";
        this.x = direction == "right" ? this.x + 2 : this.x - 2;
        canBeMovedHor = !iceboxes.some(ib => this.collide(ib)) && !walls.some(wall => this.collide(wall));
        this.x = initialX;

        if (canBeMovedHor && noBoxOnTop && this.game.player.speedy == 0 && this.game.player.y + this.game.player.image.height <= this.y + this.image.height && this.game.player.y + this.game.player.image.height > this.y) {
            this.push();
            return;
        }

        var vasVerthandled = this.handleVertCollision();
            
        if (vasVerthandled) {
            return;
        }

		if (!(canBeMovedHor && noBoxOnTop) || this.game.player.y + this.game.player.image.height != this.y + this.image.height) {
            this.handleHorCollision();
        }
	}
}

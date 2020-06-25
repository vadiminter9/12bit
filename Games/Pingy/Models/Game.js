import { gameOverImage } from '../Images.js';
import { LevelConstructor } from '../Levels/LevelConstructor.js';
import { Platform } from './Platform.js';
import { Wall } from './Wall.js';
import { Snow } from './Snow.js';
import { Panel } from './Panel.js';
import { IceBox } from './IceBox.js';
import { jump, shot } from '../Controls.js';
import { Character } from './Character.js';
import { Player } from './Player.js';

export class Game {
	constructor(ctx, staticCtx, controls, hiScore, callBack) {
		this.ctx = ctx;
		this.staticCtx = staticCtx;
		this.ctx.setTransform(1,0,0,1,0,0);

		this.isOvered = false;
		this.dt = 0;

		this.controls = controls;

		this.camera = {};
		this.camera.x = 0;
		this.camera.y = 0;
		this.hiScore = hiScore;
		this.levelCompleted = false;

		this.panel = new Panel(0, 0, this);
		this.callBack = callBack;
	}

	completeLevel = function () {
		this.levelCompleted = true;
	}

	play = function(levelNumber) {
		this.isOvered = false;
		this.controls.length = 0;
		this.prevTime = Date.now();
		this.objects = LevelConstructor.constructLevel(levelNumber, this);
		this.player = this.objects.find(x => x instanceof Player);
		this.objects.push(this.panel);
		this.animate();
	}

	animate = function() {
		if (this.isOvered) {
			return;
		}
		var now = Date.now();
		this.dt = now - (this.prevTime || now);
		this.prevTime = now;
		this.step();

		if (this.levelCompleted) {
			this.callBack();
			this.levelCompleted = false;
			return;
		}

		this.frame();
	
		window.requestAnimationFrame(() => this.animate());
	}

	fillSnow = function() {
		for (let index = 0; index < 10; index++) {
			this.objects.push(new Snow(this.camera, this));
		}
	}

	step = function() {
		this.fillSnow();
		this.checkStep();
		for (var i = 0; i < this.objects.length; i++) {
			this.objects[i].rutine(this.dt);
		}
		this.movecamera();
	}

	gameOver = function() {
		if (this.player.scores > this.hiScore) {
			this.hiScore = this.player.scores;
		}
	
		this.isOvered = true;
	}

	frame = function(){
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.ctx.translate(-this.camera.x, -this.camera.y);

		for (var i = 0; i < this.objects.length; i++) { 
			if (this.objects[i].showHarm) {
				this.ctx.globalAlpha = 0.4;
			}

			this.objects[i].draw(this.ctx);

			this.ctx.globalAlpha = 1;
		}

		if (this.isOvered) {
			this.ctx.drawImage(gameOverImage,
				this.camera.x + canvas.width / 2 - gameOverImage.width / 2,
				canvas.height / 2 - gameOverImage.height / 2
			);
		}
	}

	checkStep = function(){
		var dropingObjects = this.objects.filter(x => (x instanceof IceBox || x instanceof Character) && x.platform == null && x.speedy > 0) 

		for (let index = 0; index < dropingObjects.length; index++) {
			const element = dropingObjects[index];
			
			var platforms = this.objects.filter(x => x instanceof Platform && !x.speedy);

			platformsLoop:
			for (var i = 0; i < platforms.length; i++) { 
				if (!element.metVer(platforms[i])) {
					continue;
				}

				if (element.y + element.image.height <= platforms[i].y && (element.y + element.image.height + element.speedy) >= platforms[i].y) {
					
					element.platform = platforms[i]; 

					if (element instanceof Player && platforms[i] instanceof IceBox && this.controls[jump]) {
						this.removeNearestIceBox(platforms[i].y);	
						break platformsLoop;					
					}
					
					if (element instanceof Player && platforms[i] instanceof Wall) {
						this.player.handleHarm();
						break platformsLoop;
					}
					
					element.y = platforms[i].y - element.image.height;
					element.speedy = 0;
				}
			}
		}
	}

	removeNearestIceBox(yLevel) {
		var iceBoxes = this.objects.filter(p => p instanceof IceBox && !p.speedy && p.y == yLevel);
		var player = this.player;
		var nearestIceBox = iceBoxes.reduce(function(prev, curr) {
			var prevDx = Math.abs(player.x + player.image.width / 2 - (prev.x + prev.image.width / 2))
			var currDx = Math.abs(player.x + player.image.width / 2 - (curr.x + curr.image.width / 2))
			return prevDx < currDx ? prev : curr;
		});

		this.objects.splice(this.objects.indexOf(nearestIceBox), 1);
	}

	movecamera = function() {
		const rightPlayerPosition = 80;
		const leftPlayerPosition = 40;
		const topPlayerPosition = 0;
		const bottomPlayerPosition = 120;

		if (this.player.x - this.camera.x > rightPlayerPosition) {
			this.camera.x = this.player.x - rightPlayerPosition;
		}

		if (this.player.x - this.camera.x < leftPlayerPosition) {
			this.camera.x = this.player.x - leftPlayerPosition;
		}

		if (this.player.y - this.camera.y > bottomPlayerPosition) {
			this.camera.y++;
		}

		if (this.player.y - this.camera.y < topPlayerPosition) {
			this.camera.y--;
		}
	}
}
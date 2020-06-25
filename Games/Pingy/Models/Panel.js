import { GameObject } from './GameObject.js';
import { TextObject } from './TextObject.js';
import { Fish } from './Fish.js';
import { Heart, BlueHeart, OrangeHeart } from './Heart.js';

const scoresPositionOnScreen = 220;
const fishScoresPositionOnScreen = 120;
const heartMargin = 12;

export class Panel extends GameObject {
	constructor(x, y, game) {
        super(x, y),
        this.game = game;
        this.objects = [];

        this.scores = new TextObject(scoresPositionOnScreen, 10, '', '#fff');
		this.objects.push(this.scores);

		this.fishScores = new TextObject(fishScoresPositionOnScreen, 10, '', '#fff');
		this.objects.push(this.fishScores);

        var fishIcon = new Fish(91, 6);
        this.objects.push(fishIcon);
    }

    rutine = function() {
        if (this.livesCount != this.game.player.livesCount || this.maxLivesCount != this.game.player.maxLivesCount) {
            this.livesCount = this.game.player.livesCount;
            this.maxLivesCount = this.game.player.maxLivesCount;
            this.buildLives();
        }
        
        this.fishScores.value = 'X ' + this.game.player.fishesCount;
        this.scores.value = 'HI ' + ('0000' + this.game.hiScore).slice(-4)  + ' ' + ('0000' + this.game.player.scores).slice(-4);
    }
    
    draw = function() {
        this.game.staticCtx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < this.objects.length; i++) { 
			this.objects[i].draw(this.game.staticCtx);
		}
    }
    
    buildLives = function () {
        this.objects = this.objects.filter(x => !(x instanceof Heart));

        for (let index = 0; index < this.game.player.maxLivesCount; index++) {
            let heartX = 10 + heartMargin * index;
            var heart = index < this.game.player.livesCount ? new OrangeHeart(heartX, 8) : new BlueHeart(heartX, 8);
            this.objects.push(heart);
        }
    }
}

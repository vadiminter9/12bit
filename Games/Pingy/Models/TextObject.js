import { GameObject } from './GameObject.js';

export class TextObject extends GameObject {
    constructor (x, y, value, color) {
        super(x, y);
        this.value = value;
        this.color = color;
    }

    draw = function(ctx) {
        var lettersArray = (new String(this.value)).split('');
        var cursorposition = this.x;
        for (var i = 0; i < lettersArray.length; i++) { 
            cursorposition = drawLetter(ctx, lettersArray[i], cursorposition, this.y);
        }
    
        // set composite mode
        ctx.globalCompositeOperation = "source-in";
    
        // draw color
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
        ctx.globalCompositeOperation = "source-over";
	};
}

function drawLetter(ctx, letter, x, y) {
    const spaceWidth = 5;

	if (letter == ' ') {
		return x + spaceWidth;
	}

    var image = document.getElementById("letter" + letter);
    ctx.drawImage(image, x, y);

	return (x + image.width + 1);
}
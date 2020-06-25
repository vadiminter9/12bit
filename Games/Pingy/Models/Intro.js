import { chatImage, bearTypingImage, messageImages } from '../Images.js'
import { black, orange, lightBlue, darkBlue } from '../Pallete.js'

const startXPosition = 100;
const startYPosition = 135;

const startInputXPosition = 100;
const startInputYPosition = 120;
const newLinePosition = 160;
const inputIterations = 3;
const lineHeight = 12;

const initialMessageX = 93;
const initialMessageY = 110;
const messagePadding = 4;
const letterWidth = 7;


const rightMessagePosition = 225;

export class Intro {
	constructor(ctx, staticCtx, controls) {
		this.ctx = ctx;
        this.staticCtx = staticCtx;
        this.controls = controls;
        this.messageIndex = 0;
        this.phraseIndex = 0;
        this.cursorXPosition = startXPosition;
        this.cursorYPosition = startYPosition;

        this.inputXPosition = startInputXPosition;
        this.inputYPosition = startInputYPosition;
        this.inputIndex = 0;
        this.inputIteration = 0;
        this.inputIterations = inputIterations;
        this.inputCompleted = true;

        
    }

    show = function (level) {
        this.level = level;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
                
        this.staticCtx.setTransform(1, 0, 0, 1, 0, 0);
		this.staticCtx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.drawImage(chatImage, 0, 0);

        this.timerId = setInterval(this.print.bind(this), 80);
    }

    print = function () {
        if (this.messageIndex > this.level.messages.length - 1) {
            clearInterval(this.timerId);
            return;
        }

        let message = this.level.messages[this.messageIndex];

        if (message.character == 'bear') {
            this.inputCompleted = false;
            this.inputIterations = message.phrase.length / 4;
            this.showInput();

            if (this.inputCompleted) {
                this.sentMessage();
            }
            
            return;
        }

        if (this.phraseIndex < message.phrase.length) {
            let lettersArray = message.phrase.toUpperCase().split('');

            if (lettersArray[this.phraseIndex] == ' ' && this.cursorXPosition > newLinePosition) {
                this.cursorXPosition = startXPosition;
                this.cursorYPosition = this.cursorYPosition + lineHeight;
                this.phraseIndex++;
                return;
            }
            this.cursorXPosition = this.drawLetter(lettersArray[this.phraseIndex], this.cursorXPosition, this.cursorYPosition);
            this.phraseIndex++;
        }
        else {
            this.staticCtx.setTransform(1, 0, 0, 1, 0, 0);
            this.staticCtx.clearRect(0, 0, canvas.width, canvas.height);
            this.phraseIndex = 0;
            this.cursorXPosition = startXPosition;
            this.sentMessage();
        }
    }

    drawLetter = function (letter, x, y) {
        const spaceWidth = 5;

        if (letter == ' ') {
            return x + spaceWidth;
        }

        var image = document.getElementById("letter" + letter);
        this.staticCtx.drawImage(image, x, y);

        
        // set composite mode
        this.staticCtx.globalCompositeOperation = "source-in";
    
        // draw color
        this.staticCtx.fillStyle = black;
        this.staticCtx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
        this.staticCtx.globalCompositeOperation = "source-over";

        return (x + image.width + 1);
    }

    showInput = function () {
        const inputDotsNumber = 3;
        const dotWidth = 5;
        this.staticCtx.setTransform(1, 0, 0, 1, 0, 0);
        this.staticCtx.clearRect(0, 0, canvas.width, canvas.height);

        this.staticCtx.fillStyle = '#FFFFFF';
        this.staticCtx.fillRect(this.inputXPosition, this.inputYPosition, dotWidth, dotWidth);

        let bearTypingImageXPosition = startInputXPosition + inputDotsNumber * (dotWidth * 2);
        this.staticCtx.drawImage(bearTypingImage, bearTypingImageXPosition, this.inputYPosition);

        this.inputXPosition+= 10;
        this.inputIndex++;

        if (this.inputIndex >= inputDotsNumber) {
            this.inputIndex = 0;
            this.inputIteration++;
            this.inputXPosition = startInputXPosition;
            this.inputYPosition = startInputYPosition;
        }

        if (this.inputIteration >= this.inputIterations) {
            this.inputCompleted = true;
            this.inputIteration = 0;
        }
    };

    sentMessage = function (message) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(chatImage, 0, 0);

        let lastMessageY = initialMessageY;
        for (let index = this.messageIndex; index >= 0; index--) {
            var message = this.level.messages[index];
            lastMessageY = this.showBackground(message, lastMessageY);
            this.showMessageText(message, index);
        }

        this.messageIndex++;
    };

    showBackground = function (message, lastMessageY) {
        let numberOfLines = message.phrase.length > 20 ? 2 : 1;
        let y = lastMessageY - numberOfLines * lineHeight;


        if (message.character == 'pingy') {
            let x1 = initialMessageX;
            let x2 = initialMessageX + message.phrase.length * letterWidth + messagePadding;

            this.ctx.drawImage(messageImages.pingyBegin[numberOfLines - 1], x1, y);

            this.ctx.fillStyle = orange;
            this.ctx.fillRect(x1 + 1, y, x2 - x1 - 1, lineHeight * numberOfLines);

            this.ctx.drawImage(messageImages.pingyEnd[numberOfLines - 1], x2, y);
        }
        else {
            let x1 = rightMessagePosition - (message.phrase.length * letterWidth - messagePadding);
            let x2 = rightMessagePosition;

            this.ctx.drawImage(messageImages.bearBegin[numberOfLines - 1], x1, y);

            this.ctx.fillStyle = darkBlue;
            this.ctx.fillRect(x1 + 1, y, x2 - x1 - 1, lineHeight * numberOfLines);

            this.ctx.drawImage(messageImages.bearEnd[numberOfLines - 1], x2, y);
        }

        return y - messagePadding;
    }

    showMessageText = function (message) {

    }
}


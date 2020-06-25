import { Game } from '/Models/Game.js';
import { space } from '../Controls.js';

const zoom = 3;
const controls = new Array();

canvas.style.zoom = zoom;
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled= false;

staticCanvas.style.zoom = zoom;
const staticCtx = staticCanvas.getContext("2d");
staticCtx.imageSmoothingEnabled= false;

var game = null;

document.onkeydown = document.onkeyup = document.onkeypress = updateControls;

function updateControls(e) {
	if (e.type == "keydown" || e.type == "keypress"){
		controls[e.keyCode] = true;
	}
	
	if (e.type == "keyup"){
		controls[e.keyCode] = false;
	}

	if (e.keyCode == space) {
        if (!game || game.isOvered) {
			game = new Game(ctx, staticCtx, controls, game && game.hiScore || 0, 1);
			animate();
        }
	}
}

let prevTime;

const animate = function() {
	if (game.isOvered) {
		return;
	}

	var now = Date.now();
	game.dt = now - (prevTime || now);
	prevTime = now;
	game.step();
	game.frame();

	window.requestAnimationFrame(animate);
}


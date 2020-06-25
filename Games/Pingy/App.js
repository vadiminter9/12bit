import { Game } from "./Models/Game.js";
import { level1 } from './Levels/LevelMaps/LevelMap1.js';
import { level2 } from './Levels/LevelMaps/LevelMap2.js';
import { Intro } from "./Models/Intro.js";
import { Outro } from "./Models/Outro.js";
import { space } from '../Controls.js';

const zoom = 3;
const controls = new Array();

canvas.style.zoom = zoom;
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled= false;

staticCanvas.style.zoom = zoom;
const staticCtx = staticCanvas.getContext("2d");
staticCtx.imageSmoothingEnabled= false;

function updateControls(e) {
	if (e.type == "keydown" || e.type == "keypress"){
		controls[e.keyCode] = true;
	}
	
	if (e.type == "keyup"){
		controls[e.keyCode] = false;

		if (e.keyCode == space) {
			updateState();
		}
	}
}

document.onkeydown = document.onkeyup = document.onkeypress = updateControls;

const hiScore = 100;
const levels = [level1, level2];

const START_GAME_SCREEN = "START_GAME_SCREEN";
const LEVEL_INTRO_SCREEN = "LEVEL_INTRO_SCREEN";
const LEVEL_SCREEN = "LEVEL_SCREEN";
const LEVEL_OUTRO_SCREEN = "LEVEL_OUTRO_SCREEN";
const END_GAME_SCREEN = "END_GAME_SCREEN";

const state = {
	screen: START_GAME_SCREEN,
	level: 0
};

const updateState = function () {
	switch (state.screen) {
		case START_GAME_SCREEN:
			intro.show(levels[state.level]);
			state.screen = LEVEL_INTRO_SCREEN;
			break;
		
		case LEVEL_INTRO_SCREEN:
			game.play(state.level);
			state.screen = LEVEL_SCREEN;
			break;

		case LEVEL_SCREEN:			
			if (game.isOvered) {
				game.play(state.level);
			} else {
				game.isOvered = true;
				outro.show(state.level);
				state.screen = LEVEL_OUTRO_SCREEN;
			}
			break;
		
		case LEVEL_OUTRO_SCREEN:
			if (state.level + 1 < levels.length) {
				state.level++;
				intro.show(levels[state.level]);
				state.screen = LEVEL_INTRO_SCREEN;
			} else {
				showEndGameScreen();
				state.screen = END_GAME_SCREEN;
			}
			break;

		case END_GAME_SCREEN:
			showStartGameScreen();
			state.level = 0;
			state.screen = START_GAME_SCREEN;
			break;

		default:
			showStartGameScreen();
			state.screen = START_GAME_SCREEN;
			break;
	}
}


const showStartGameScreen = function () {
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "24px serif";
	ctx.fillText("Start Game Screen", 10, 50);
}

const showEndGameScreen = function () {
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "24px serif";
	ctx.fillText("End Game Screen", 10, 50);
}

const intro = new Intro(ctx, staticCtx);
const outro = new Outro(ctx, staticCtx);
const game = new Game(ctx, staticCtx, controls, hiScore || 0, updateState);

showStartGameScreen(ctx);


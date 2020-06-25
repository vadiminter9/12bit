import { Wall } from "../../Models/Wall.js";
import { Platform } from "../../Models/Platform.js";
import { Fish } from "../../Models/Fish.js";
import { IceBox } from "../../Models/IceBox.js";
import { SnowMan } from "../../Models/SnowMan.js";
import { Switch } from "../../Models/Switch.js";
import { Player } from "../../Models/Player.js";
import { Finish } from "../../Models/Finish.js";

const FlyingPlatrormType = 1;
const WallPlatformImageType = 3;
const ColonImageType = 4;
const playerInitialPositionX = 60;
const playerInitialPositionY = 80;

var targetPlatform = new Platform(960, 100, FlyingPlatrormType);

export const level2 = {

    getObjects: function () {
        return [
            new Player(playerInitialPositionX, playerInitialPositionY),
            // Walls
            new Wall(350, 120, WallPlatformImageType),
    
            // Platforms
            new Platform(100, 90, FlyingPlatrormType),
    
            //Fishes
            new Fish(590, 100),


    
            // IceBoxes
            new IceBox(820, 110),
            new IceBox(840, 125),
            new IceBox(860, 125),
            new IceBox(880, 110),
            new IceBox(880, 95),
            new IceBox(860, 110),
    
            // SnowMans
            new SnowMan(550, 105),
    
            targetPlatform,
            new Switch(920, 110, targetPlatform, targetPlatform.x, targetPlatform.y - 50),
            new Platform(936, 90, ColonImageType),
    
            new Finish(1050, 110)
        ]
    },

    dialogs: [
        {character: 'pingy', phrase: 'Hi!'},
        {character: 'bear', phrase: 'Hi!'},
        {character: 'pingy', phrase: 'How are you?'},
    ],

    length: 100
};
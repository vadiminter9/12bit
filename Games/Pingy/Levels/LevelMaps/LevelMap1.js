import { Wall } from "../../Models/Wall.js";
import { Platform } from "../../Models/Platform.js";
import { Fish } from "../../Models/Fish.js";
import { IceBox } from "../../Models/IceBox.js";
import { SnowMan } from "../../Models/SnowMan.js";
import { BlackHeart, BlueHeart, OrangeHeart } from "../../Models/Heart.js";
import { Switch } from "../../Models/Switch.js";
import { Player } from "../../Models/Player.js";
import { Nerp } from "../../Models/Nerp.js";
import { Finish } from "../../Models/Finish.js";

const FlyingPlatrormType = 1;
const WallPlatformImageType = 3;
const ColonImageType = 4;
const playerInitialPositionX = 60;
const playerInitialPositionY = 80;

var targetPlatform = new Platform(960, 100, FlyingPlatrormType);

export const level1 = {

    getObjects: function () {
        return [
            new Player(playerInitialPositionX, playerInitialPositionY),
            // Walls
            new Wall(350, 120, WallPlatformImageType),
    
            // Platforms
            new Platform(100, 90, FlyingPlatrormType),
            new Platform(160, 90, FlyingPlatrormType),
            new Platform(220, 90, FlyingPlatrormType),
    
            //Fishes
            new Fish(590, 100),
            new Fish(620, 100),
            new Fish(650, 100),
            new Fish(680, 100),
            new Fish(710, 100),
            new Fish(740, 100),
    
            // Hearts
            new BlackHeart(762, 130),
            new BlueHeart(777, 130),
            new OrangeHeart(792, 130),
    
            // IceBoxes
            new IceBox(140, 75),
            new IceBox(155, 75),
            new IceBox(170, 75),
            new IceBox(155, 60),
            new IceBox(170, 60),
            new IceBox(170, 45),
            new IceBox(760, 125),
            new IceBox(775, 125),
            new IceBox(790, 125),
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
    
            new Nerp(80, 115),
            new Finish(1050, 110)
        ]
    },

    messages: [
        {character: 'pingy', phrase: 'Hi!'},
        {character: 'bear', phrase: 'Hi!'},
        {character: 'pingy', phrase: 'How are you&'},
        {character: 'bear', phrase: 'I am fine'},
        {character: 'pingy', phrase: 'How is the weather&'},
        {character: 'bear', phrase: 'Whether is fine but it is a too warm'},
    ],

    length: 100
};
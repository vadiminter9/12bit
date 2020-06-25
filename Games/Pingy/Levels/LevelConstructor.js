import { level1 } from './LevelMaps/LevelMap1.js';
import { level2 } from './LevelMaps/LevelMap2.js';
import { platformImage } from '../Images.js';
import { Platform } from '../Models/Platform.js';
import { IceBox } from '../Models/IceBox.js';
import { Heart } from '../Models/Heart.js';

const platformDefaultYPosition = 140;

export class LevelConstructor {
    static constructLevel = function (levelNumber, game) {
        let levels = [level1, level2];
        let level = levels[levelNumber];

        const groundPlatformType = 0;

        let objects = level.getObjects();

        for (let index = 0; index < level.length; index++) {
            objects.push(new Platform(index * platformImage[0].width, platformDefaultYPosition, groundPlatformType))
        }

        var hearts = objects.filter(x => x instanceof Heart);
        var iceBoxes = objects.filter(x => x instanceof IceBox);

        hearts && iceBoxes && hearts.map(heart => {
            iceBoxes.map(box => {
                if (box.collide(heart)) {
                    heart.box = box;
                }
            });
        });

        objects.map(item => item.game = game);

        return objects;
    }
}

export class GameObject {

    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
    }

	rutine = function () {
    }
  
    deleteMe = function () {
        this.game.objects.splice(this.game.objects.indexOf(this), 1);
    }
}
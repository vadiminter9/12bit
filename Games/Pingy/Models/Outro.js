export class Outro {
	constructor(ctx, staticCtx, controls) {
		this.ctx = ctx;
        this.staticCtx = staticCtx;
        this.controls = controls;
    }

    show = function (level) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.staticCtx.setTransform(1, 0, 0, 1, 0, 0);
		this.staticCtx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.font = "24px serif";
        this.ctx.fillText("End Level " + (level + 1) +" Screen", 10, 50);
    }
}
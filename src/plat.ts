import {Drawable} from "./drawable";
import {Game} from "./game";
import {Paths} from "./Paths";
const bc = {r:66,g:60,b:55};
const tc = {r:27,g:60,b:26};
export class Plat extends Drawable{
    l:number; //length
    p: Paths;
    constructor(x:number, y:number, l:number) {
        super(x,y);
        this.l=l;
        this.p=new Paths([
            [`M0,31L80,0L${this.l-80},0L${this.l},31L0,31`,tc],
            [`M0,31L80,97L${this.l-80},97L${this.l},31L0,31Z`, bc]
        ])
    }
    draw() {
        const ctx=Game.ctx!;
        ctx.save()
        ctx.translate(this.xy.x, this.xy.y);
        this.p.draw();
        ctx.restore();
    }
}
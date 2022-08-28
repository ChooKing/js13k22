import {Drawable} from "./drawable";
import {Game} from "./game";
import {Paths} from "./Paths";
const bc = {r:68,g:68,b:51};
const tc = {r:27,g:60,b:26};
export class Plat extends Drawable{
    l:number; //length
    p: Paths;
    constructor(x:number, y:number, l:number) {
        super(Game.tw*x,Game.h-(Game.th*y+Game.tyo));
        this.l=Game.tw*l;
        this.p=new Paths([
            [`M0,60L10,0L${this.l-10},0L${this.l},60L0,60`,tc],
            [`M0,60L0,77L${this.l},77L${this.l},60L0,60Z`, bc]
        ])
    }
    draw() {
        const ctx=Game.ctx!;
        ctx.save()
        ctx.translate(this.xy.x, this.xy.y);
        this.p.draw();
        ctx.restore();
    }
    update(t: number) {
    }
}
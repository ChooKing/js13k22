import {Drawable} from "./drawable";
import {Game} from "./game";
import {Paths} from "./Paths";
import {tex} from "./tex";
const bc = {r:68,g:68,b:51};
const tc = {r:27,g:60,b:26};
const cp={x:800, y:-100}; //center point for perspective

export class Plat extends Drawable{
    w:number;
    h:number;
    p: Paths;
    constructor(x:number, y:number, l:number) {
        super(Game.tw*x,Game.th*y);
        this.h=60;
        this.w=Game.tw*l;
        this.p=new Paths([
            [`M0,60L10,0L${this.w-10},0L${this.w},60L0,60`,tc],
            [`M0,60L0,77L${this.w},77L${this.w},60L0,60Z`, bc]
        ])
    }
    get vx(){
        return this.xy.x-Game.cx;
    }
    get vy(){
        return this.xy.y-Game.cy;
    }
    draw() {
        const ctx=Game.ctx!;
        ctx.save()
        ctx.filter="brightness(1.4)";
        ctx.beginPath();
        ctx.moveTo(this.vx,this.vy+60);
        ctx.lineTo(this.vx+(((cp.x-this.vx)*60)/(this.vy+60-cp.y)),this.vy);
        ctx.lineTo(this.vx+this.w-(((this.vx+this.w-cp.x)*60)/(this.vy+60-cp.y)),this.vy);
        ctx.lineTo(this.vx+this.w,this.vy+60);
        ctx.lineTo(this.vx,this.vy+60);
        ctx.clip();
        ctx.drawImage(tex.fc!,this.xy.x-Game.cx,this.xy.y-Game.cy);
        ctx.restore();
        ctx.drawImage(tex.fc!,this.vx,this.vy+60,this.w,17);
    }
    update(t: number) {
        console.log(t)
    }

    xin(d:Drawable){//x range of drawable in x range of platform?
        return (d.xy.x>=this.xy.x && d.xy.x<=this.xy.x+this.w-(d.w*0.4))||(d.xy.x+d.w>=(this.xy.x+d.w*0.4) && d.xy.x+d.w<=this.xy.x+this.w);
    }
}

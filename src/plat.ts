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
        super(Game.tw*x,Game.h-(Game.th*y+Game.tyo));
        this.h=60;
        this.w=Game.tw*l;
        this.p=new Paths([
            [`M0,60L10,0L${this.w-10},0L${this.w},60L0,60`,tc],
            [`M0,60L0,77L${this.w},77L${this.w},60L0,60Z`, bc]
        ])
    }
    draw() {
        const ctx=Game.ctx!;
        ctx.save()
        //ctx.translate(this.xy.x, this.xy.y);
        ctx.fillStyle=tex.floor!;

        ctx.filter="brightness(0.9)";
        ctx.beginPath();
        ctx.moveTo(this.xy.x,this.xy.y+60);
        ctx.lineTo(this.xy.x+(((cp.x-this.xy.x)*60)/(this.xy.y+60-cp.y)),this.xy.y);
        ctx.lineTo(this.xy.x+this.w-(((this.xy.x+this.w-cp.x)*60)/(this.xy.y+60-cp.y)),this.xy.y);
        ctx.lineTo(this.xy.x+this.w,this.xy.y+60);
        ctx.lineTo(this.xy.x,this.xy.y+60);
        ctx.fill();
        ctx.fillStyle=tex.floor!;
        ctx.filter="url(#dil) brightness(0.8)";
        ctx.fillRect(this.xy.x,this.xy.y+60,this.w,17);


        ctx.restore();


    }
    update(t: number) {
        console.log(t)
    }
    xin(d:Drawable){//x range of drawable in x range of platform?
        return (d.xy.x>=this.xy.x && d.xy.x<=this.xy.x+this.w-(d.w*0.5))||(d.xy.x+d.w>=(this.xy.x+d.w*0.6) && d.xy.x+d.w<=this.xy.x+this.w);
    }
}
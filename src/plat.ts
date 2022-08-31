import {Drawable} from "./drawable";
import {Game} from "./game";
import {Paths} from "./Paths";
import {tex} from "./tex";
const bc = {r:68,g:68,b:51};
const tc = {r:27,g:60,b:26};
const cp={x:800, y:-100}; //center point for perspective

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
        //ctx.translate(this.xy.x, this.xy.y);
        ctx.fillStyle=tex.floor!;

        ctx.filter="brightness(0.9)";
        ctx.beginPath();
        ctx.moveTo(this.xy.x,this.xy.y+60);
        ctx.lineTo(this.xy.x+(((cp.x-this.xy.x)*60)/(this.xy.y+60-cp.y)),this.xy.y);
        ctx.lineTo(this.xy.x+this.l-(((this.xy.x+this.l-cp.x)*60)/(this.xy.y+60-cp.y)),this.xy.y);
        //ctx.lineTo(this.xy.x+this.l-10,this.xy.y);
        ctx.lineTo(this.xy.x+this.l,this.xy.y+60);
        ctx.lineTo(this.xy.x,this.xy.y+60);
        ctx.fill();
        ctx.fillStyle=tex.floor!;
        ctx.filter="url(#dil) brightness(0.8)";
        ctx.fillRect(this.xy.x,this.xy.y+60,this.l,17);
        /*
        ctx.beginPath()
        ctx.moveTo(this.xy.x,this.xy.y+60);
        ctx.lineTo(this.xy.x+this.l,this.xy.y+60);
        ctx.lineTo(this.xy.x+this.l,this.xy.y+77);
        ctx.lineTo(this.xy.x,this.xy.y+77);
        ctx.lineTo(this.xy.x,this.xy.y);
        ctx.fill();

         */
        /*
        ctx.filter="url()";
        ctx.strokeStyle="rgb(255,0,0)";
        ctx.beginPath();
        ctx.moveTo(this.xy.x,this.xy.y+60);
        ctx.lineTo(cp.x,cp.y);
        ctx.stroke();
        ctx.moveTo(this.xy.x+this.l,this.xy.y+60);
        ctx.lineTo(cp.x,cp.y);
        ctx.stroke();

         */
        /*
        ctx.moveTo(this.xy.x,this.xy.y+77);
        ctx.lineTo(cp.x,cp.y);
        ctx.stroke();
        ctx.moveTo(this.xy.x+this.l,this.xy.y+77);
        ctx.lineTo(cp.x,cp.y);
        ctx.stroke();
         */

        //ctx.fillRect(this.xy.x,this.xy.y+60,this.l,17);
        //this.p.draw();
        /*
        ctx.fillStyle=tex.floor!;

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.quadraticCurveTo(20,60, 80,60);
        ctx.quadraticCurveTo(this.l-20,60, this.l-80,60);
        ctx.quadraticCurveTo(this.l-80,60, this.l-20,0);
        ctx.quadraticCurveTo(this.l,0,this.l-80,0);
        ctx.lineTo(0,0);
        ctx.fill();

         */
        ctx.restore();


    }
    update(t: number) {
        console.log(t)
    }
}
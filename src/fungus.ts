import {Drawable} from "./drawable";
import {Game,rf} from "./game";
import {vis} from "./util";

export class Fungus extends Drawable{
    lt: number;//last update time
    g: number; //gravity acceleration factor
    sx:number;//speedX
    constructor(x:number, y:number, s:number) {
        super(x,y);
        this.lt=0;
        this.g=1;
        this.sx=s;
    }
    draw() {
        if(vis(this)){
            const ctx=Game.ctx!;
            ctx.save();
            ctx.fillStyle="rgb(30,86,40)";
            ctx.beginPath();
            ctx.arc(this.xy.x-Game.cx,this.xy.y-Game.cy,5,0,6.28);
            ctx.fill();
            ctx.restore();
        }


    }
    update(t: number) {
        if(this.lt==0) this.lt=t;
        const dt = (t-this.lt)/1000;
        this.g*=1.05;
        this.xy.y+=this.g*dt;
        this.xy.x+=this.sx*dt;
        if(this.xy.y>Game.wh) rf(this);
        this.lt = t;
    }
}
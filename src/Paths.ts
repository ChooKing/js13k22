import {ColoredPath, RGB} from "./types";
import {rgb2str} from "./util";
import {Game} from "./game";
import {tex} from "./tex";
type PathDef = [string, RGB]
export class Paths{
    paths: ColoredPath[];
    a: number;//angle
    constructor(p:PathDef[]) {
        this.a=0;
        this.paths=Array();
        p.forEach((i)=>{
            this.paths.push([new Path2D(i[0]),i[1]]);
        });
    }
    draw(){
        const ctx=Game.ctx!;
        for(let i=0;i<this.paths.length;i++){
            ctx.save();
            let c=rgb2str(this.paths[i][1]);

            if(c=="rgb(68,68,51)"){
                ctx.fillStyle=tex.rock!;
                ctx.filter="brightness(1.2)"
            }
            else if(c=="rgb(27,60,26)"){
                ctx.fillStyle=tex.floor!;
                ctx.filter="brightness(1)"
            }
            else ctx.fillStyle = c;

            ctx.fill(this.paths[i][0]);

            ctx.restore();
        }
    }
}
import {ColoredPath, RGB} from "./types";
import {rgb2str} from "./util";
import {Game} from "./game";
//import {tex} from "./tex";
export type PathDef = [string, RGB]
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

            ctx.fillStyle = rgb2str(this.paths[i][1]);
            ctx.fill(this.paths[i][0]);

            ctx.restore();
        }
    }
}
import {ColoredPath, RGB} from "./types";
import {rgb2str} from "./util";
import {Game} from "./game";
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
        for(let i=0;i<this.paths.length;i++){
            // @ts-ignore
            Game.ctx.fillStyle = rgb2str(this.paths[i][1]);
            // @ts-ignore
            Game.ctx.fill(this.paths[i][0]);
        }
    }
}
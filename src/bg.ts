import {Game} from "./game";
import {tex} from "./tex";
//const p = new Path2D("M0,0L1600,0L1600,900L0,900L0,0Z");
//const c = "rgb(33,30,27)";



export const bg={
    draw:()=>{
        const ctx=Game.ctx!;
        ctx.drawImage(tex.rc!,-Game.cx%Game.cw,-Game.cy%Game.ch);
        ctx.drawImage(tex.rc!,(-Game.cx%Game.cw)+Game.cw,-Game.cy%Game.ch);
        ctx.drawImage(tex.rc!,-Game.cx%Game.cw,(-Game.cy%Game.ch)+Game.ch);
        ctx.drawImage(tex.rc!,(-Game.cx%Game.cw)+Game.cw,(-Game.cy%Game.ch)+Game.ch);

    }
}
import {Game} from "./game";
import {tex} from "./tex";
//const p = new Path2D("M0,0L1600,0L1600,900L0,900L0,0Z");
//const c = "rgb(33,30,27)";



export const bg={
    //iData:null as ImageData|null,
    //buf: null as Uint32Array|null,
    //p: null as CanvasPattern|null,
    /*
    init:()=>{
        bg.iData = Game.ctx!.createImageData(Game.cw, Game.ch);
        bg.buf = new Uint32Array(bg.iData.data.buffer);

        for (let i=0;i<bg.buf.length;i++){
            bg.buf[i]=Math.tan(i)>0.5? 0xff000000: 0xff444400;
        }
        createImageBitmap(bg.iData).then((b)=>{
            bg.p = Game.ctx!.createPattern(b,null);
        });

    },

     */
    draw:()=>{
        const ctx=Game.ctx!;
        ctx.drawImage(tex.rc!,-Game.cx,-Game.cy);
        /*
        ctx.save();

        ctx.fillStyle=tex.rock!;
        ctx.fillRect(-Game.cx,Game.cy,Game.cw*2,Game.ch*2);
        ctx.restore();


         */
    }
}
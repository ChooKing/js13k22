import {Game} from "./game";
export const tex={
    rc: null as HTMLCanvasElement|null, //rock canvas
    fc: null as HTMLCanvasElement|null, //floor canvas
    rctx: null as CanvasRenderingContext2D|null,
    fctx: null as CanvasRenderingContext2D|null,
    //rock: null as CanvasPattern|null,
    floor: null as CanvasPattern|null,
    init:()=>{
        tex.rc = document.createElement("canvas");
        tex.rc.width=Game.cw;
        tex.rc.height=Game.ch;
        tex.rctx = tex.rc.getContext("2d");
        const ctx=tex.rctx!;
        ctx.filter="url(#rock)";
        ctx.fillRect(0,0,Game.cw,Game.ch);
        //tex.rock = Game.ctx!.createPattern(tex.rc,null);

        tex.fc = document.createElement("canvas");
        tex.fc.width=Game.cw;
        tex.fc.height=Game.ch;
        tex.fctx = tex.fc.getContext("2d");
        const id = Game.ctx!.createImageData(Game.cw,Game.ch);
        const buf = new Uint32Array(id.data.buffer);
        for(let i=0;i<buf.length;i++){
            buf[i] = Math.floor(i/Game.ch/(Math.random()*8))*Math.random()<1? 0xff112211+((Math.random()*40)):0xff334444;
        }
        tex.fctx!.putImageData(id,0,0);
    }
}


import {Game} from "./game";
export const tex={
    can: null as HTMLCanvasElement|null,
    ctx: null as CanvasRenderingContext2D|null,
    rock: null as CanvasPattern|null,
    floor: null as CanvasPattern|null,
    init:()=>{
        tex.can = document.createElement("canvas");
        tex.can.width=Game.w;
        tex.can.height=Game.h;
        tex.ctx = tex.can.getContext("2d");
        const ctx=tex.ctx!;
        ctx.filter="url(#rock)";
        ctx.fillRect(0,0,Game.w,Game.h);
        tex.rock = Game.ctx!.createPattern(tex.can,null);
        setTimeout(()=>{
            tex.ctx!.clearRect(0,0,Game.w,Game.h);
            ctx.filter="url(#plat)";
            ctx.fillRect(0,0,Game.w,Game.h);
            tex.floor= Game.ctx!.createPattern(tex.can!,null);

        },250)

    }
}
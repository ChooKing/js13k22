import {Plat} from "./plat";

export const Game = {
    ctx: undefined as CanvasRenderingContext2D|undefined,
    w: 1600, //canvas width
    h: 900, //canvas height
    th: 225, //tile height
    tw: 350, //tile width
    tyo: 65, //tile Y offset
    ns: 1200, //speed
    init:()=>{
        Game.ps=[new Plat(2,2,1),
            new Plat(0, 0, 2)]

    },
    ps: [] as Array<Plat>
}

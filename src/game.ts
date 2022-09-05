import {Plat} from "./plat";

export const Game = {
    ctx: undefined as CanvasRenderingContext2D|undefined,
    cw: 1600, //canvas width
    ch: 900, //canvas height
    ww:16000, //world width
    wh:9000, //world height
    cx:0, //cameraX
    cy:0, //cameraY
    th: 225, //tile height
    tw: 350, //tile width
    tyo: 65, //tile Y offset
    ns: 1200, //speed
    ls: false, //like side movement
    init:()=>{
        Game.ps=[new Plat(2,2,1),
            new Plat(0, 0, 2),
            new Plat(3, 0, 2),
            new Plat(5,2,1),]

    },
    ps: [] as Array<Plat>
}

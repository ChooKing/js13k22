import {Plat} from "./plat";
import {Zombie} from "./zombie";

export const Game = {
    ctx: undefined as CanvasRenderingContext2D|undefined,
    cw: 1600, //canvas width
    ch: 900, //canvas height
    ww:16000, //world width
    wh:9000, //world height
    cx:0, //cameraX
    cy:0, //cameraY
    th: 240, //tile height
    tw: 350, //tile width
    tyo: 65, //tile Y offset
    ns: 1200, //speed
    ls: false, //like side movement
    init:()=>{
        Game.ps=[
            new Plat(0, 8, 1),
            new Plat(1,7,2),
            new Plat(3, 5, 2),
            new Plat(3, 2, 2),
            new Plat(5, 4, 1),
            new Plat(6,3,1)
        ]

    },
    ps: [] as Array<Plat>,
    zs: [] as Array<Zombie>
}
export const rz=(z:Zombie)=>{
    Game.zs=Game.zs.filter(i=>i!=z)
}
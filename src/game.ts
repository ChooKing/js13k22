import {Plat} from "./plat";
import {Zombie} from "./zombie";
import {Fungus} from "./fungus";

export const Game = {
    score: 0,
    hp:100,
    ctx: undefined as CanvasRenderingContext2D|undefined,
    cw: 1600, //canvas width
    ch: 900, //canvas height
    ww:14000, //world width
    wh:6000, //world height
    cx:0, //cameraX
    cy:0, //cameraY
    th: 240, //tile height
    tw: 350, //tile width
    tyo: 65, //tile Y offset
    tr: 25, //tile rows
    tc: 40, //tile columns
    ns: 1200, //speed
    ls: false, //like side movement
    pe:200, //platform edge - avoid placing zombies beyond this position
    zsp:-100,//zombie speed
    init:()=>{
        for(let r=3;r<Game.tr;r++){
            for(let c=0;c<Game.tc;c++){
                if(r%3==0){
                    if(c%3==0){
                        Game.ps.push(new Plat(c,r,1))
                    }
                }
                else{
                    if((c-1)%3==0){
                        Game.ps.push(new Plat(c,r,2))
                    }
                }

            }

        }
    },
    ps: [] as Array<Plat>,
    zs: [] as Array<Zombie>,
    fs: [] as Array<Fungus>
}
export const rz=(z:Zombie)=>{
    Game.zs=Game.zs.filter(i=>i!=z);
}
export const rf=(f:Fungus)=>{
    Game.fs=Game.fs.filter(i=>i!=f);
}
import {Plat} from "./plat";
import {Zombie} from "./zombie";
import {Fungus} from "./fungus";
import {stat} from "./stat";
import {Ninja} from "./ninja";

export const Game = {
    gs: 1, //Game State 0=opening, 1=story, 2=play, 3=dead
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
    nj:null as Ninja|null, //ninja
    init:()=>{
        for(let r=3;r<Game.tr;r++){
            for(let c=0;c<Game.tc;c++){
                if(r%3==0){
                    if(c%3==0){
                        Game.ps.push(new Plat(c,r,1))
                    }
                }
                else if ((r-1)%3==0){
                    if((c-1)%3==0){
                        Game.ps.push(new Plat(c,r,2))
                    }
                }

            }

        }
    },
    ps: [] as Array<Plat>,
    zs: [] as Array<Zombie>,
    fs: [] as Array<Fungus>,
    zGen:()=>{//Zombie generator
        Game.ps.forEach(p=>{
            if(!((p.xy.x==0)&&(p.xy.y==(Game.tr-1)*Game.th))){
                const z = new Zombie(p.xy.x+Math.random()*(p.w-Game.pe*2)+Game.pe, p.xy.y-314,p);
                if(Math.random()>0.5){
                    z.f=true;
                    z.s=-Game.zsp;
                }
                Game.zs.push(z);
            }
        });
    },
    reset:()=>{
        Game.nj!.xy.x=0;
        Game.nj!.xy.y=Game.wh-800;
        Game.nj!.g=1;
        Game.nj!.yo=0;
        Game.score=0;
        Game.hp=100;
        stat.update();
        Game.zs=[];
        Game.fs=[];
        Game.zGen();
        stat.hideBut();
        stat.setMsg("");
    },
    gsn:()=>{ //Game State Next
        if(Game.gs<3) Game.gs++;
        else Game.gs = 2;
        if(Game.gs==2){

            Game.reset();
        }
    },
    end:()=>{
        stat.setMsg(`<h2>DEATH COMES TOO SOON</h2>`);
        stat.setBut("Play Again",true);

    }
}
export const rz=(z:Zombie)=>{
    Game.zs=Game.zs.filter(i=>i!=z);
}
export const rf=(f:Fungus)=>{
    Game.fs=Game.fs.filter(i=>i!=f);
}
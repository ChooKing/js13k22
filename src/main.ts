import {Ninja} from "./ninja";
import {Game} from "./game";
//import {Point} from "./types";
import {Keyboard} from "./keyboard";
import {tex} from "./tex";
import {bg} from "./bg";
import {stat} from "./stat";
//import {Fungus} from "./fungus";
const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
canvas.width=1600;
canvas.height=900;
Game.init();
Game.ctx = canvas.getContext("2d")!;
const ctx=Game.ctx!;
Game.nj = new Ninja(0,Game.wh-800);//y425
const ninja = Game.nj;
tex.init();
/*
document.addEventListener('mousemove', (e) => {
    m.x=e.x-(window.innerWidth-Game.cw)/2;
    m.y=e.y;
});

 */
/*
document.addEventListener('click',(e)=>{
    console.log(e.x-(window.innerWidth-Game.cw)/2,e.y);
});
 */
stat.init();
ninja.setCollider(()=>{
   console.log("hit")
});


const k=Keyboard.init();
k.addDownHandler(" ",()=>{
    ninja.ct=true;
});
k.addDownHandler("ArrowRight",()=>{
    if(!Game.ls){
        if(ninja.f) ninja.f=false;
        else ninja.s=Game.ns;
    }
});
k.addDownHandler("ArrowLeft",()=>{
    if(!Game.ls){
        if(!ninja.f) ninja.f=true;
        else ninja.s=-Game.ns;
    }
});
k.addDownHandler("ArrowDown",()=>{
    if(ninja.jmp===0){
        ninja.jmp=-1;
    }
});
k.addDownHandler("ArrowUp",()=>{
    if(ninja.jmp==0){

        ninja.jmp=-1;
        setTimeout(()=>{
            ninja.jmp=0;
            setTimeout(()=>{
                ninja.ij=1700;
                ninja.jmp=1;
                ninja.cr=0;
            },50)
        },150);
    }
});
k.addUpHandler(" ",()=>{
    ninja.ct=false;
});
k.addUpHandler("ArrowRight",()=>{
    ninja.s=0;
});
k.addUpHandler("ArrowLeft",()=>{
    ninja.s=0;
});
k.addUpHandler("ArrowDown",()=>{
    if(ninja.jmp==-1){
        ninja.jmp=0;
        ninja.s=0;
    }
});
Game.zGen();
stat.setMsg(`<h1>ZOMBIE FUNGUS</h1><p>A brain eating fungus is turning people into zombies. You are a ninja whose mission is to stop the spread of the fungus by killing the zombies.</p><p>It is virutally impossilbe to carry out this mission
without also becoming infected. To avoid spreading the fungus yourself, you have taken herbs that will prevent you from becoming a zombie by turning into poison if it comes in contact with the fungus. To avoid injury, you must evade the
orange spores of the fungus. </p><p>Move using the arrow keys on the keyboard and attack using the space bar</p>`);
stat.setBut("Start Game",true);

let ss=true; //show stat
const run=(time: number)=>{
    if(Game.gs==2 && ss){
        stat.update();
        ss=false;
    }
    ctx.clearRect(0, 0, Game.cw, Game.ch);
    bg.draw();
    Game.ps.forEach(p=>{
        p.draw();
    });
    ninja.update(time);
    ninja.draw();
    Game.fs.forEach(f=>{
        f.update(time);
        f.draw();
    });
    Game.zs.forEach(z=>{
        z.update(time);
        z.draw();
    });

    window.requestAnimationFrame((t)=>{
        run(t);
    });
}
run(0)

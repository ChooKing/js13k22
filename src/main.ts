import {Ninja} from "./ninja";
import {Game} from "./game";
import {Point} from "./types";
import {Keyboard} from "./keyboard";
const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
canvas.width=1600;
canvas.height=900;
Game.ctx = canvas.getContext("2d")!;
const ctx=Game.ctx!;
let m:Point={x:0,y:0};
let mColor="rgb(255,255,255)";
const viruses=[m];
const ninja = new Ninja(0,440, viruses);
document.addEventListener('mousemove', (e) => {
    m.x=e.x-(window.innerWidth-Game.w)/2;
    m.y=e.y;
});
document.addEventListener('click',(e)=>{
    console.log(e.x-(window.innerWidth-Game.w)/2,e.y);
})
ninja.setCollider(()=>{
   mColor="rgb(255,0,0)";
});
const k=Keyboard.init();
k.addDownHandler(" ",()=>{
    ninja.ct=true;
});
k.addDownHandler("ArrowRight",()=>{
    if(ninja.s===0){
        ninja.s=Game.ns;
    }
});
k.addDownHandler("ArrowLeft",()=>{
    if(ninja.s===0){
        ninja.s=-Game.ns;
    }
});
k.addDownHandler("ArrowDown",()=>{
    if(ninja.jmp===0){
        ninja.jmp=-1;
    }
});
k.addUpHandler(" ",()=>{
    ninja.ct=false;
});
k.addUpHandler("ArrowRight",()=>{
    ninja.s=0;
    console.log(ninja.s)
});
k.addUpHandler("ArrowLeft",()=>{
    ninja.s=0;
    console.log(ninja.s)
});
const run=(time: number)=>{
    ctx.clearRect(0, 0, Game.w, Game.h);
    /*
    this.drawables.forEach((s)=>{
        s.update?.(time);
        s.draw(this.ctx);
    });

     */
    ninja.update(time);
    ninja.draw();

    /*
    if(ninja.collide(ctx,m.x,m.y)){
        ctx.fillStyle="rgb(255,0,0)";
    }
    else ctx.fillStyle="rgb(255,255,255)";

     */
    ctx.fillStyle=mColor;
    ctx.beginPath();
    ctx.arc(m.x,m.y,5,0,6.28);
    ctx.fill();
    mColor="rgb(255,255,255)";
    window.requestAnimationFrame((t)=>{
        run(t);
    });
}
run(0)

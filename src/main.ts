import {Ninja} from "./ninja";
import {Game} from "./game";
import {Point} from "./types";
const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
canvas.width=1600;
canvas.height=900;
const ctx = canvas.getContext("2d")!;
// @ts-ignore
Game.ctx = ctx;


let m:Point={x:0,y:0};
let mColor="rgb(255,255,255)";
const viruses=[m];
const ninja = new Ninja(100,0, viruses);
document.addEventListener('mousemove', (e) => {
    m.x=e.x-(window.innerWidth-Game.w)/2;
    m.y=e.y;
});
ninja.setCollider(()=>{
   mColor="rgb(255,0,0)";
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
    ninja.draw(ctx);

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

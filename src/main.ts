import {Ninja} from "./ninja";
import {Game} from "./game";
const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
canvas.width=1600;
canvas.height=900;
const ctx = canvas.getContext("2d")!;
// @ts-ignore
Game.ctx = ctx;
const ninja = new Ninja(100,100);
let mouseX=0;
let mouseY=0;
document.addEventListener('mousemove', (e) => {
    mouseX=e.x-(window.innerWidth-Game.w)/2;
    mouseY=e.y;
});



const run=(time: number)=>{
    ctx.clearRect(0, 0, Game.w, Game.h);
    /*
    this.drawables.forEach((s)=>{
        s.update?.(time);
        s.draw(this.ctx);
    });

     */
    ninja.draw();


    if(ninja.collide(ctx,mouseX,mouseY)){
        ctx.fillStyle="rgb(255,0,0)";
    }
    else ctx.fillStyle="rgb(255,255,255)";
    ctx.beginPath();
    ctx.arc(mouseX,mouseY,5,0,6.28);
    ctx.fill();
    window.requestAnimationFrame((t)=>{
        run(t);
    });
}
run(0)

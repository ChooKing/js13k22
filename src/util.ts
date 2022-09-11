import {RGB} from "./types";
import {Drawable} from "./drawable";
import {Game} from "./game";
export const rgb2str=(rgb: RGB)=>{
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
}
export const dark=(c:RGB,f:number)=>{
    return {r:Math.floor(c.r*f),g:Math.floor(c.g*f),b:Math.floor(c.b*f)}
}
export const vis=(d:Drawable)=>{
    const inx =  (d.xy.x>=Game.cx && d.xy.x<=Game.cx+Game.cw)||(d.xy.x+d.w>=Game.cx && d.xy.x+d.w<=Game.cx+Game.cw);
    if(!inx) return false;
    return (d.xy.y>=Game.cy && d.xy.y<=Game.cy+Game.ch)||(d.xy.y+d.h>=Game.cy && d.xy.y+d.h<=Game.cy+Game.ch);
}

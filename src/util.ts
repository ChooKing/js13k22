import {RGB} from "./types";
export const rgb2str=(rgb: RGB)=>{
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
}
export const dark=(c:RGB,f:number)=>{
    return {r:Math.floor(c.r*f),g:Math.floor(c.g*f),b:Math.floor(c.b*f)}
}

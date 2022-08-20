import {RGB} from "./types";
export const rgb2str=(rgb: RGB)=>{
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
}
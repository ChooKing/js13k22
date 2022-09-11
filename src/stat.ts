import {Game} from "./game";

export const stat={
    st:null as HTMLDivElement|null, //score text
    init:()=>{
        stat.st=document.querySelector("#st");
    },
    update:()=>{
        stat.st!.innerText="SCORE: "+Game.score.toString();
    }
}
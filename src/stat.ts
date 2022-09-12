import {Game} from "./game";

export const stat={
    st:null as HTMLDivElement|null, //score text
    hp:null as HTMLDivElement|null, //health points text
    init:()=>{
        stat.st=document.querySelector("#st");
        stat.hp=document.querySelector("#hp");
    },
    update:()=>{
        stat.hp!.innerText="HEALTH: "+Game.hp.toString();
        stat.st!.innerText="SCORE: "+Game.score.toString();
    }
}
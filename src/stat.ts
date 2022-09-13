import {Game} from "./game";

export const stat={
    st:null as HTMLDivElement|null, //score text
    hp:null as HTMLDivElement|null, //health points text
    msg:null as HTMLDivElement|null, //message text
    but:null as HTMLButtonElement|null,//button
    init:()=>{
        stat.st=document.querySelector("#st");
        stat.hp=document.querySelector("#hp");
        stat.msg=document.querySelector("#msg");
        stat.but=document.querySelector("#but");
    },
    update:()=>{
        stat.hp!.innerText="HEALTH: "+Game.hp.toString();
        stat.st!.innerText="SCORE: "+Game.score.toString();
    },
    setMsg:(s:string)=>{
        stat.msg!.innerHTML=s;
    },
    setBut:(s:string, v:boolean)=>{
        stat.but!.innerText=s;
        if(v){
            if(stat.but?.classList.contains("hid")) stat.but!.classList.remove("hid");
        }
    }
}
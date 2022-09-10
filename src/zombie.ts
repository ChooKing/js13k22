import {Drawable} from "./drawable";
import {Game} from "./game";
import {Paths, PathDef} from "./Paths";
import {Point, mp} from "./types";
import {Plat} from "./plat";

const c=[
    {r:78,g:78,b:78},
    {r:192,g:181,b:154},
    {r:40,g:40,b:10},
    {r:100,g: 40, b:50},
    {r:193,g:70,b:70},
    {r:0,g:0,b:0},
    {r:170,g:156,b:120},
    {r:235,g:231,b:220},
    {r:188,g:178,b:176},
    {r:194,g:167,b:161}
];

//path strings

const ps:Record<string, PathDef[]>={
    arm: [
        ["M82,87C79,75 117,79 131,80C140,81 146,87 146,94C145,101 138,105 130,104C115,103 85,101 82,87Z",c[0]],
        ["M33,59C42,54 47,66 81,73C91,75 99,85 96,90C94,95 85,96 76,92C61,84 23,64 33,59Z",c[0]],
        ["M30,49C30,49 20,42 17,41C16,40 15,43 16,44C17,45 21,49 25,51C21,48 15,45 13,44C11,44 10,46 11,47C13,49 21,54 26,56L26,57C21,54 14,49 12,49C11,48 10,51 11,51C13,53 18,57 22,60C19,57 15,55 13,54C11,53 10,55 11,56C14,58 30,68 34,66L39,59C40,57 37,54 37,54C37,52 28,39 30,49Z",c[1]]
    ],
    head:[
        ["M135,66C135,66 127,69 119,70C116,70 118,60 116,57C114,54 107,58 105,57C100,54 93,49 98,48C115,46 101,40 99,40C93,41 98,38 94,36C86,34 99,32 100,20C103,0 134,2 140,6C160,20 146,40 136,52C129,60 142,64 135,66Z",c[1]],
        ["M109,21C106,21 104,23 103,25C102,28 104,31 106,31C109,32 112,30 113,27C113,24 112,22 109,21Z", c[4]],
        ["M109,23C107,23 106,24 105,26C105,28 105,29 107,29C108,30 110,28 110,26C111,25 110,23 109,23Z",c[5]],
        ["M104,20C105,18 108,17 111,18C114,19 115,21 115,22C114,22 112,21 110,20C108,20 105,19 104,20Z",c[5]],
        ["M136,52C129,60 142,32 141,29C139,22 135,20 129,14C123,7 102,18 103,12C105,-8 134,2 140,6C160,20 146,40 136,52Z",c[5]],
        ["M128,33C130,32 131,29 130,26C128,22 126,23 122,25C123,27 127,24 128,27C129,29 128,31 128,33Z",c[6]],
        ["M124,31C125,31 127,30 127,29C127,27 126,27 122,27C123,28 126,28 125,29C125,30 124,31 124,31Z",c[6]],
        ["M98,42C98,41 98,40 98,40L97,40C97,40 96,41 96,41C96,41 96,44 97,44L98,44C98,44 98,42 98,42Z",c[7]],
        ["M98,48C98,49 98,50 98,50L97,50C97,50 96,49 96,49C96,49 96,46 97,46L98,46C98,46 98,48 98,48Z",c[7]],
        ["M96,39C94,40 95,41 99,41C101,41 103,42 104,43C106,44 108,46 108,45C108,43 103,41 101,40C99,39 97,38 96,39Z",c[9]],
        ["M97,50C95,49 96,48 100,48C102,48 104,47 105,46C106,45 109,44 108,45C107,46 104,48 102,49C100,50 98,51 97,50Z",c[9]],
        ["M123,32C122,33 121,34 121,35C122,36 123,36 125,34C125,34 123,35 122,34C122,34 123,33 123,32Z",c[6]]

    ],
    core:[
        ["M137,64C147,68 156,87 149,106C136,139 147,174 143,186C141,192 113,189 98,188C81,187 101,137 107,98C108,85 114,75 120,69L137,64Z",c[2]]
    ],
    thigh:[
        ["M71,258C53,244 91,211 97,190C101,175 117,172 128,183C135,190 136,203 123,216C116,225 89,269 81,260C69,248 80,265 71,258Z",c[3]]
    ],
    shin:[
        ["M67,326C58,324 57,329 50,321C44,316 66,277 64,261C63,248 68,245 76,247C85,248 91,258 89,270C85,290 82,330 67,326Z",c[3]]
    ],
    foot:[
        ["M70,337C68,342 66,350 55,346C37,338 30,353 20,332C17,325 41,335 56,323C60,320 70,321 72,323L70,337Z",c[5]]
    ]
}


interface angs{
    al: number;
    ar: number;
    tl: number;
    sl: number;
    fl: number;
    tr: number
    sr: number;
    fr: number;
}
const ctr=(x: number, y:number, a:number)=>{
    const c=Game.ctx!;
    c.save();
    c.translate(x,y);
    c.rotate(a);
    c.translate(-x,-y);
}
export class Zombie extends Drawable{
    w:number;
    h:number;
    s: number; //speed
    f: boolean;
    lt: number;//last update time


    armL:Paths;
    armR: Paths;
    head: Paths;
    core: Paths;
    thighR: Paths;
    thighL: Paths;
    shinR: Paths;
    shinL: Paths;
    footR: Paths;
    footL: Paths;

    cols: Point[];
    wp:mp;//walk phase
    angs: angs;


    pl: Plat|null;

    onCollide?: ()=>void;
    constructor(x: number, y: number, col: Point[]) {
        super(x, y);
        this.w=194;
        this.h=350;
        this.xy={x:x, y:y};
        this.cols=col;
        this.f = false;
        this.wp=0;
        this.lt = 0;
        this.s=0;
        this.angs={al:0, ar: -0.2, tl:-1.1,sl:0.5,fl:0.5,tr:0,sr:0,fr:0};
        this.pl=null;

        this.armL=new Paths(ps.arm);
        this.armR=new Paths(ps.arm);
        this.head=new Paths(ps.head);
        this.core=new Paths(ps.core);
        this.thighR=new Paths(ps.thigh);
        this.thighL=new Paths(ps.thigh);
        this.shinR=new Paths(ps.shin);
        this.shinL=new Paths(ps.shin);
        this.footR=new Paths(ps.foot);
        this.footL=new Paths(ps.foot);



    }
    checkCol(p:Paths){
        this.cols.forEach((co)=>{
            p.paths.forEach((i)=>{
                if((this.onCollide)&&(this.collide(Game.ctx!,i[0],co.x,co.y))) this.onCollide();
            })
        })
    }
    dp(p:Paths){//draw part
        p.draw();
        //this.checkCol(p);
    }
    get vx(){
        return this.xy.x-Game.cx;
    }
    get vy(){
        return this.xy.y-Game.cy;
    }
    draw() {
        const ctx=Game.ctx!;
        ctx.save();
        if(this.f){
            ctx.setTransform(-1,0,0,1,this.w+(this.vx*2),this.vy);
        }
        else ctx.translate(this.vx, this.vy);

        ctr(133,93,this.angs.ar);
        this.dp(this.armR);
        ctx.restore();
        ctr(114,184,this.angs.tr)
        this.dp(this.thighR);
        ctr(77,252,this.angs.sr);
        this.dp(this.shinR);
        ctr(183,320,this.angs.fr);
        this.dp(this.footR);
        ctx.restore();
        ctx.restore();
        ctx.restore();
        ctr(114,184,this.angs.tl)
        this.dp(this.thighL);
        ctr(87,252,this.angs.sl);
        this.dp(this.shinL);
        ctr(65,326,this.angs.fl);
        this.dp(this.footL);
        ctx.restore();
        ctx.restore();
        ctx.restore();
        this.dp(this.head);
        this.dp(this.core);
        ctr(133,93,this.angs.al);
        this.dp(this.armL);
        ctx.restore();




        ctx.restore();



        /*
        this.dp(this.core);


        this.dp(this.armR);
        ctx.restore();
        ctx.restore();
        ctr(66,298,this.angs.tl);//0.75
        this.dp(this.thighL);
        ctr(129,358,this.angs.sl);//0.5
        this.dp(this.shinL);
        ctr(152,423,this.angs.fl);
        this.dp(this.footL);
        ctx.restore();
        ctx.restore();
        ctx.restore();
        ctr(66,298,this.angs.tr);//-0.8
        this.dp(this.thighR);
        ctr(58,365,this.angs.sr);//-0.3
        this.dp(this.shinR);
        ctr(12,431,this.angs.fr);//0.75
        this.dp(this.footR);
        ctx.restore();
        ctx.restore();
        ctx.restore();
        ctx.restore();

         */

    }
    setCollider(c:()=>void){
        this.onCollide=c;
    }
    update(t: number){

        const dt = (t-this.lt)/1000;



        //const rv=Game.ns/125; //rotations per second for everything other than cutting
        if(this.lt===0) this.lt=t;


        if((this.s>0 && this.xy.x+this.w<Game.ww)||(this.s<0 && this.xy.x>0)){
            this.xy.x+= this.s*dt;
            if(this.xy.x>Game.cw/2 && this.xy.x<Game.ww-(Game.cw/2)){
                Game.cx = this.xy.x-(Game.cw/2);
            }

        }




        this.lt = t;


    }

}
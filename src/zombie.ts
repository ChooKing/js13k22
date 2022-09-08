import {Drawable} from "./drawable";
import {Game} from "./game";
import {Paths, PathDef} from "./Paths";
import {Point, mp} from "./types";
import {Plat} from "./plat";

const c=[
    {r:78,g:78,b:78},
    {r:192,g:181,b:154},
    {r:40,g:40,b:10},
    {r:100,g: 40, b:50}
];

//path strings

const ps:Record<string, PathDef[]>={
    arm: [
        ["M82,87c-3,-12 35,-8 50,-7c8,1 15,7 14,14c-0,7 -8,11 -16,10c-15,-2 -45,-3 -48,-17Z",c[0]],
        ["M33,59c10,-5 14,7 48,14c9,2 18,12 15,17c-2,5 -12,6 -20,2c-15,-8 -53,-27 -43,-32Z",c[0]],
        ["M30,49c0,0 -10,-7 -13,-8c-1,0 -2,2 -1,3c2,2 6,5 10,7c-4,-3 -11,-6 -13,-7c-1,-1 -3,2 -1,3c2,2 10,7 15,9l0,0c-4,-3 -11,-7 -14,-8c-1,-1 -3,2 -1,3c2,2 7,6 12,8c-3,-2 -7,-5 -10,-6c-1,-1 -2,2 -1,3c3,2 18,12 23,10l5,-7c1,-2 -2,-5 -2,-5c-1,-2 -9,-15 -7,-5Z",c[1]]
    ],
    core:[
        ["M136.641,64.122c10.597,4.158 19.162,22.995 11.921,41.636c-12.974,33.398 -1.292,68.23 -5.854,80.727c-2.177,5.967 -29.511,2.891 -45.193,1.551c-16.596,-1.418 3.848,-50.778 9.183,-90.294c1.68,-12.443 6.932,-22.811 13.315,-28.83l16.628,-4.79Z",c[2]]
    ],
    thigh:[
        ["M71,258c-18,-14 19,-47 25,-68c4,-14 20,-18 30,-7c7,7 8,21 -4,34c-8,8 -35,52 -43,44c-12,-12 -1,5 -9,-2Z",c[3]]
    ],
    shin:[
        ["M67,326c-9,-2 -9,2 -17,-5c-6,-6 16,-44 14,-60c-1,-12 3,-15 12,-14c9,1 14,12 12,23c-3,20 -7,60 -22,56Z",c[3]]
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
    core: Paths;
    thighR: Paths;
    thighL: Paths;
    shinR: Paths;
    shinL: Paths;
    /*






    footR: Paths;
    footL: Paths;

     */
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
        this.angs={al:0, ar: -0.2, tl:-1.1,sl:0.5,fl:0,tr:0,sr:0,fr:0};
        this.pl=null;

        this.armL=new Paths(ps.arm);
        this.armR=new Paths(ps.arm);
        this.core=new Paths(ps.core);
        this.thighR=new Paths(ps.thigh);
        this.thighL=new Paths(ps.thigh);
        this.shinR=new Paths(ps.shin);
        this.shinL=new Paths(ps.shin);


        /*
        this.thighL=new Paths([["M129,360C145,357 115,310 103,292C96,282 85,277 77,282C70,286 69,298 76,309C88,327 111,364 129,360Z", c[2]]]);

        this.core=new Paths([
            ["M63,159C63,159 84,168 94,161C107,150 101,133 90,116C79,99 57,111 57,111C38,118 41,153 63,159Z",c[0]],
            ["M92,120C89,118 79,121 76,123C75,126 77,135 80,136C83,138 96,138 98,136C100,133 95,121 92,120Z",c[1]],
            ["M86,127C87,126 88,128 89,129C89,131 88,132 87,133C86,133 85,132 85,130C84,128 85,127 86,127Z",c[0]],
            ["M90,124C89,123 86,122 84,123C81,123 80,125 80,127C81,126 83,125 85,125C87,124 88,124 90,124Z",c[0]],
            ["M61,168C50,172 41,191 49,209C67,257 33,317 87,302C103,297 96,241 91,201C89,189 84,178 77,172L81,156L64,152L61,168Z",c[0]],

        ]);

        this.armR=new Paths([
            ["M105,210C114,202 85,184 73,177C67,173 59,174 55,179C52,184 55,192 61,196C73,203 95,218 105,210Z",c[2]],
            ["M134,173C124,170 125,182 101,193C93,196 91,206 94,210C98,215 106,214 111,209C121,200 143,177 134,174Z",c[2]],
            ["M136,168C136,168 142,164 144,164C145,164 146,166 145,166C144,167 141,169 139,170C141,169 145,168 146,167C147,167 148,169 147,169C146,170 142,173 139,174L139,174C142,173 146,171 147,170C148,170 149,172 148,173C147,173 144,175 141,176C143,175 147,174 148,173C149,173 150,175 150,175C148,176 142,180 140,180C139,180 135,181 135,180L131,174C130,172 132,171 132,171C132,170 134,166 136,168Z",c[7]]
        ]);
        this.thighR=new Paths([
            ["M57,374C80,377 74,325 85,306C93,295 80,282 69,281C59,279 41,289 47,308C53,329 34,371 57,374Z",c[2]]
        ]);
        this.shinR=new Paths([
            ["M11,431C26,433 22,416 57,391C67,384 68,367 61,362C54,357 43,360 36,370C24,387 -4,429 11,431Z",c[2]]
        ]);
        this.shinL=new Paths([
            ["M151,425C137,422 144,408 120,373C113,364 116,348 123,346C130,343 139,350 143,361C149,380 164,428 151,425Z",c[2]]
        ]);
        this.footL=new Paths([
            ["M141,429C141,434 142,443 154,440C172,436 176,452 190,434C195,428 169,432 157,418C154,414 149,414 146,416L141,429Z",c[0]]
        ])
        this.footR=new Paths([
            ["M2,435C2,440 2,449 14,447C33,444 36,460 51,443C56,437 30,440 19,425C16,421 11,420 8,422L2,435Z",c[0]]
        ]);


         */
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
        ctr(114,194,this.angs.tr)
        this.dp(this.thighR);
        ctr(77,262,this.angs.sr);
        this.dp(this.shinR);
        ctx.restore();
        ctx.restore();
        ctr(114,194,this.angs.tl)
        this.dp(this.thighL);
        ctr(87,262,this.angs.sl);
        this.dp(this.shinL);
        ctx.restore();
        ctx.restore();
        this.dp(this.core);
        ctr(133,93,this.angs.al);
        this.dp(this.armL);
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
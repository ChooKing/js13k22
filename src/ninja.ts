import {Entity} from "./entity";
import {Game} from "./game";
import {Paths} from "./Paths";
import {Point, wp, Angles} from "./types";

const c=[
    {r:1,g:1,b:0},
    {r:202,g:190,b:160},
    {r:18,g:18,b:18},
    {r:235,g:235,b:235},
    {r:241,g:208,b:103},
    {r:65,g:62,b:51},
    {r:86,g:84,b:79},
    {r:192,g:181,b:154}
];
const cs=0.2; //cutting speed
const rv=5; //rotations per second for everything other than cutting
//keep outside of class to avoid using "this" (code golf)
const rs:Angles={ //rotations
    ca:{m:1.1,c:0}, //cutting angle
    tl:{m:0.75,c:0}, //thigh left
    sl:{m:0.5,c:0}, //shin left
    fl:{m:-1.2,c:0},//foot left
    tr:{m:-0.8,c:0}, //thigh right
    sr:{m:-0.3,c:0}, //shin right
    fr:{m:0.8,c:0} //foot right
}
const ctr=(x: number, y:number, a:number)=>{
    const c=Game.ctx!;
    c.save();
    c.translate(x,y);
    c.rotate(a);
    c.translate(-x,-y);
}
export class Ninja extends Entity{
    static w = 189;
    static h = 449;
    s: number; //speed
    f: boolean;
    lt: number;//last update time
    ct: boolean; //isCutting?
    core: Paths;
    thighL: Paths;
    armL:Paths;
    sword: Paths;
    swHand: Paths;
    armR: Paths;
    thighR: Paths;
    shinR: Paths;
    shinL: Paths;
    footR: Paths;
    footL: Paths;
    //paths: Paths[];
    cols: Point[];
    wp:wp;//walk phase
    onCollide?: ()=>void;
    constructor(x: number, y: number, col: Point[]) {
        super(x, y);
        this.xy={x:x, y:y};
        this.cols=col;
        this.f = false;
        this.wp=0;
        this.lt = 0;
        this.s=0;

        this.ct=false;
        this.thighL=new Paths([["M129,360C145,357 115,310 103,292C96,282 85,277 77,282C70,286 69,298 76,309C88,327 111,364 129,360Z", c[2]]]);
        this.armL=new Paths([
            ["M116,188C121,179 86,175 73,173C65,172 58,176 58,181C57,186 62,191 70,192C83,194 110,198 116,188Z",c[2]],
            ["M156,182C163,189 148,189 123,195C114,197 108,195 107.,190C106,186 111,183 118,182C129,180 148,174 156,182Z",c[2]]
        ]);
        this.core=new Paths([
            ["M63,159C63,159 84,168 94,161C107,150 101,133 90,116C79,99 57,111 57,111C38,118 41,153 63,159Z",c[0]],
            ["M92,120C89,118 79,121 76,123C75,126 77,135 80,136C83,138 96,138 98,136C100,133 95,121 92,120Z",c[1]],
            ["M86,127C87,126 88,128 89,129C89,131 88,132 87,133C86,133 85,132 85,130C84,128 85,127 86,127Z",c[0]],
            ["M90,124C89,123 86,122 84,123C81,123 80,125 80,127C81,126 83,125 85,125C87,124 88,124 90,124Z",c[0]],
            ["M61,168C50,172 41,191 49,209C67,257 33,317 87,302C103,297 96,241 91,201C89,189 84,178 77,172L81,156L64,152L61,168Z",c[0]],

        ]);
        this.sword=new Paths([
            ["M56,3L66,9C66,9 96,54 108,78C120,102 139,155 139,155L133,158C133,158 114,106 102,81C89,56 56,4 56,4Z",c[3]]
        ])
        this.swHand=new Paths([
            ["M130,157L141,154L142,159L132,162L130,157Z",c[4]],
            ["M131,163L144,158L145,161L132,165L131,163Z",c[5]],
            ["M134,165L143,162L154,193L145,196L134,165",c[0]],
            ["M148,178C148,178 140,181 138,182C138,182 139,184 139,184C141,184 144,183 146,182C144,183 140,184 139,185C139,185 140,188 140,187C142,187 146,186 149,184L149,185C146,185 142,187 141,188C140,189 141,191 142,191C143,190 147,189 150,188C148,189 144,190 142,191C142,191 142,193 143,193C145,193 152,191 153,189C153,189 158,184 157,182L154,178C154,177 151,177 151,177C150,176 147,175 148,178Z",c[7]]
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

        //this.paths=Array();
        /*
        this.paths.push(this.armL);
        this.paths.push(this.core);
        this.paths.push(this.sword);
        this.paths.push(this.swHand);
        this.paths.push(this.thighL);
        this.paths.push(this.shinL);
        this.paths.push(this.footL);
        this.paths.push(this.armR);
        this.paths.push(this.thighR);
        this.paths.push(this.shinR);
        this.paths.push(this.footR);
        this.armR.a=0;

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
        this.checkCol(p);
    }
    draw() {
        const ctx=Game.ctx!;
        ctx.save();
        if(this.f){
            ctx.setTransform(-1,0,0,1,Ninja.w+(this.xy.x*2),this.xy.y);
        }
        else ctx.translate(this.xy.x, this.xy.y);

        ctr(91,277,rs["ca"].c/2);
        ctr(66,186,rs["ca"].c);
        this.dp(this.armL);


        ctx.restore();
        this.dp(this.core);
        ctr(66,186,rs["ca"].c);
        this.sword.draw();
        this.dp(this.swHand);
        this.dp(this.armR);
        ctx.restore();
        ctx.restore();
        ctr(66,298,rs["tl"].c);//0.75
        this.dp(this.thighL);
        ctr(129,358,rs["sl"].c);//0.5
        this.dp(this.shinL);
        ctr(152,423,rs["fl"].c);
        this.dp(this.footL);
        ctx.restore();
        ctx.restore();
        ctx.restore();
        ctr(66,298,rs["tr"].c);//-0.8
        this.dp(this.thighR);
        ctr(58,365,rs["sr"].c);//-0.3
        this.dp(this.shinR);
        ctr(12,431,rs["fr"].c);//0.75
        this.dp(this.footR);
        ctx.restore();
        ctx.restore();
        ctx.restore();
        ctx.restore();

    }
    setCollider(c:()=>void){
        this.onCollide=c;
    }
    update(t: number){
        if(this.lt===0) this.lt=t;

        if(this.ct && rs["ca"].c<rs["ca"].m){
            rs["ca"].c+=cs;
        }
        else if(!this.ct && rs["ca"].c>0){
            rs["ca"].c-=cs;
            if(rs["ca"].c<0) rs["ca"].c=0;
        }
        const dt = (t-this.lt)/1000;
        if((this.s>0 && this.xy.x+Ninja.w<Game.w)||(this.s<0 && this.xy.x>0)) this.xy.x+= this.s*dt;

        if(this.s>0){
            if(this.wp===0) this.wp=1;
            if(this.wp===1){
                if(rs["tl"].c<rs["tl"].m){
                    rs["tl"].c+=rv*dt*rs["tl"].m;
                    rs["tr"].c+=rv*dt*rs["tr"].m;
                    rs["sl"].c+=rv*dt*rs["sl"].m;
                    rs["fl"].c+=rv*dt*rs["fl"].m;
                    rs["sr"].c+=rv*dt*rs["sr"].m;
                    rs["fr"].c+=rv*dt*rs["fr"].m;

                }
                else this.wp=2;
            }
            if(this.wp===2){
                if(rs["tl"].c>0){
                    rs["tl"].c-=rv*dt*rs["tl"].m;
                    rs["tr"].c-=rv*dt*rs["tr"].m;
                    rs["sl"].c-=rv*dt*rs["sl"].m;
                    rs["fl"].c-=rv*dt*rs["fl"].m;
                    rs["sr"].c-=rv*dt*rs["sr"].m;
                    rs["fr"].c-=rv*dt*rs["fr"].m;
                }
                else this.wp=1;
            }

        }

        this.lt = t;
    }
    /*
    collide(ctx: CanvasRenderingContext2D,x:number, y:number){
        let c=false
        this.paths.forEach((p)=>{
            p.paths.forEach((i)=>{
                if(i!==this.sword.paths[0]){
                    if(ctx.isPointInPath(i[0],x,y)) c=true;
                }
            });
        });
        return c;
    }

     */
}
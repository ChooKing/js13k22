import {Entity} from "./entity";
import {Game} from "./game";
import {Paths} from "./Paths";
import {Point} from "./types";

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
const mca=1.1; //maximum cutting angle
const cs=0.2; //cutting speed
const ctt=(x:number, y:number)=>{
    Game.ctx!.translate(x,y);
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
    ca: number; //cutting angle
    onCollide?: ()=>void;
    constructor(x: number, y: number, col: Point[]) {
        super(x, y);
        this.xy={x:x, y:y};
        this.cols=col;
        this.f = false;
        this.lt = 0;
        this.s=0;
        this.ca=0;
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
            ["M56.343,3.711L66.899,8.894C66.899,8.894 95.991,54.013 108.058,78.344C120.171,102.768 139.577,155.436 139.577,155.436L133.263,158.701C133.263,158.701 114.342,106.66 102.077,81.946C89.257,56.114 56.343,3.711 56.343,3.711Z",c[3]]
        ])
        this.swHand=new Paths([
            ["M130.772,157.746L141.007,154.281L142.683,159.028L132.448,162.493L130.772,157.746Z",c[4]],
            ["M131.192,163.061L144.283,158.629L145.316,161.555L132.225,165.987L131.192,163.061Z",c[5]],
            ["M134.161,165.56L143.022,162.56L154.097,193.921L145.236,196.921L134.161,165.56",c[0]],
            ["M148.313,178.599C148.313,178.599 140.361,181.245 138.954,182.242C138.382,182.648 139.169,184.663 139.865,184.573C141.158,184.407 144.814,183.297 146.986,182.231C144.295,183.136 140.957,184.788 139.845,185.538C139.204,185.97 139.991,187.986 140.756,187.869C142.099,187.664 146.942,186.013 149.509,184.852L149.591,185.041C146.887,185.965 142.429,187.943 141.334,188.682C140.693,189.115 141.48,191.13 142.245,191.013C143.568,190.811 147.357,189.604 149.952,188.446C148.028,188.799 144.029,190.606 142.747,191.427C142.109,191.834 142.796,193.591 143.541,193.458C145.318,193.143 151.91,191.073 153.093,189.326C153.731,189.135 157.992,184.256 157.313,182.839L154.874,178.904C154.195,177.486 151.928,177.413 151.928,177.413C150.902,176.672 147.939,175.812 148.313,178.599Z",c[7]]
        ]);
        this.armR=new Paths([
            ["M105.787,210.381C114.852,202.959 85.237,184.884 73.822,177.88C67.235,173.839 59.16,174.66 55.801,179.712C52.442,184.764 55.062,192.147 61.649,196.188C73.064,203.192 95.898,218.478 105.787,210.381Z",c[2]],
            ["M134.568,173.99C124.947,170.78 125.613,181.998 100.71,193.423C93.878,196.557 90.979,206.624 94.884,210.869C98.79,215.115 106.322,214.381 111.694,209.231C121.004,200.306 143.904,177.106 134.568,173.99Z",c[2]],
            ["M136.146,168.556C136.146,168.556 142.842,164.993 144.523,164.609C145.207,164.453 146.184,166.383 145.654,166.842C144.667,167.694 141.403,169.68 139.16,170.588C141.629,169.186 145.086,167.799 146.385,167.47C147.136,167.281 148.113,169.211 147.516,169.703C146.468,170.568 142.008,173.076 139.431,174.216L139.518,174.403C142.009,173.003 146.455,171 147.737,170.676C148.487,170.487 149.464,172.417 148.867,172.909C147.834,173.761 144.408,175.78 141.815,176.942C143.361,175.743 147.374,173.968 148.84,173.559C149.569,173.356 150.42,175.038 149.825,175.505C148.404,176.62 142.467,180.153 140.376,179.87C139.809,180.218 135.523,181.087 134.919,179.636L131.421,174.249C130.817,172.797 132.274,171.058 132.274,171.058C132.406,169.799 134.318,166.419 136.146,168.556Z",c[7]]
        ]);
        this.thighR=new Paths([
            ["M57.147,374.315C80.067,376.834 74.395,325.194 85.861,306.646C92.744,295.512 80.338,282.908 69.811,281.085C59.284,279.263 41.427,289.148 47.211,308.097C53.601,329.032 34.75,371.853 57.147,374.315Z",c[2]]
        ]);
        this.shinR=new Paths([
            ["M11.032,431.66C26.552,433.52 22.539,416.565 57.436,391.181C67.009,384.217 68.737,367.893 61.651,362.635C54.565,357.378 43.283,360.891 36.473,370.475C24.67,387.087 -4.027,429.855 11.032,431.66Z",c[2]]
        ]);
        this.shinL=new Paths([
            ["M151.371,425.796C137.666,422.637 144.855,408.285 120.58,373.959C113.92,364.542 116.053,348.969 123.286,346.353C130.519,343.736 139.406,350.512 143.118,361.474C149.553,380.475 164.67,428.861 151.371,425.796Z",c[2]]
        ]);
        this.footL=new Paths([
            ["M141.279,429.664C141.581,434.215 142.116,443.168 154.198,440.563C172.669,436.581 176.778,452.391 190.446,434.516C195.447,427.977 169.324,432.962 157.501,418.119C154.566,414.435 149.039,414.359 146.253,416.282L141.279,429.664Z",c[0]]
        ])
        this.footR=new Paths([
            ["M2.398,435.539C2.37,440.101 2.256,449.069 14.494,447.345C33.205,444.71 36.159,460.775 51.085,443.937C56.546,437.776 30.131,440.858 19.413,425.199C16.752,421.312 11.245,420.836 8.327,422.553L2.398,435.539Z",c[0]]
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
        ctx.save();
        ctt(91,277);
        ctx.rotate(this.ca/2);
        ctt(-91,-277);
        ctx.save();
        ctt(66,186);
        ctx.rotate(this.ca);
        ctt(-66,-186);
        this.dp(this.armL);
        ctx.restore();
        this.dp(this.core);
        ctx.save();
        ctt(66,186);
        ctx.rotate(this.ca);
        ctt(-66,-186);
        this.sword.draw();
        this.dp(this.swHand);
        this.dp(this.armR);
        ctx.restore();
        ctx.restore();
        this.dp(this.thighL);
        this.dp(this.shinL);
        this.dp(this.footL);
        this.dp(this.thighR);
        this.dp(this.shinR);
        this.dp(this.footR);

        ctx.restore();

    }
    setCollider(c:()=>void){
        this.onCollide=c;
    }
    update(t: number){
        if(this.ct && this.ca<mca){
            this.ca+=cs;
        }
        else if(!this.ct && this.ca>0){
            this.ca-=cs;
            if(this.ca<0) this.ca=0;
        }
        const dt = (t-this.lt)/1000;
        if(dt<1){
            if((this.s>0 && this.xy.x+Ninja.w<Game.w)||(this.s<0 && this.xy.x>0)) this.xy.x+= this.s*dt;
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
export interface RGB{
    r: number;
    g: number;
    b: number;
}
export interface Point{
    x: number;
    y: number;
}
export interface Rect{
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface IDrawable{
    draw: (ctx: CanvasRenderingContext2D)=>void;
    update?: (time: number)=>void;
}
export interface aData {
    m: number,//max
    c: number//current
}
export type Angles=Record<string, aData>
export type HandlerMap = Map<string, ()=>void>;
export type ColoredPath = [Path2D, RGB];
export type wp = -2|-1|0|1|2;
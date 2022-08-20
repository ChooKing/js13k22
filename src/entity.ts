import {Point} from "./types";

export abstract class Entity{
    xy: Point;
    constructor(x: number, y: number) {
        this.xy={x:x, y: y};
    }
    abstract draw(ctx: CanvasRenderingContext2D):void;
    abstract update(t: number):void;
}
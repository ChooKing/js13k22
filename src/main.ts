import {Ninja} from "./ninja";
import {Game} from "./game";
const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
canvas.width=1600;
canvas.height=900;

// @ts-ignore
Game.ctx = canvas.getContext("2d")!;

const ninja = new Ninja(100,100);
ninja.draw();
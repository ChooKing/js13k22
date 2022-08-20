export const Game = {
    ctx: CanvasRenderingContext2D,
    w: 1600, //canvas width
    h: 900, //canvas height
    tw: 100, //track width
    tg: 25, //track gap
    colors: [
        {r:66,g:127,b:164},
        {r: 164, g: 127, b: 66},
        {r: 127, g: 174, b: 66},
        {r: 200, g: 66, b: 66},
        {r: 200, g: 200, b: 200}
    ],
    pw: 80, //player width
    mGap: 5, //maximum gap as ratio of pw
    s: 100 //speed
}

import { HandlerMap } from "./types";
export class Keyboard{
    private static instance: Keyboard;
    private downHandlers: HandlerMap;
    private upHandlers: HandlerMap;
    private constructor(){
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        this.downHandlers = new Map<string, ()=>void>();
        this.upHandlers = new Map<string, ()=>void>();
    }
    public static init(){
        if(!Keyboard.instance){
            Keyboard.instance=new Keyboard();
        }
        return Keyboard.instance;
    }
    addDownHandler=(key: string, handler: ()=>void)=>{
        this.downHandlers.set(key, handler);
    }
    addUpHandler=(key: string, handler: ()=>void)=>{
        this.upHandlers.set(key, handler);
    }
    onKeyDown = (event: KeyboardEvent)=>{
        const handler = this.downHandlers.get(event.key);
        if(handler) handler();
    }
    onKeyUp = (event: KeyboardEvent)=>{
        const handler = this.upHandlers.get(event.key);
        if(handler) handler();
    }
}
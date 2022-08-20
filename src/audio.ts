const AudioContext = window.AudioContext;
const audioCtx = new AudioContext();

export interface Synth{
    oscillator: OscillatorNode;
    gain: GainNode;
    start():void;
    play(f: number):void;
}
export const synth:Synth = {
    oscillator: new OscillatorNode(audioCtx, {type: "sine"}),
    gain: new GainNode(audioCtx),
    start(){
        this.oscillator.connect(this.gain);
        this.gain.connect(audioCtx.destination);
        this.gain.gain.value = 0.3;
        this.oscillator.frequency.value = 0;
        this.oscillator.start(0);
    },
    play(f: number){
        /*
        if(f===0){
            audioCtx.suspend();
        }
        else{
            audioCtx.resume();
        }

         */
        this.oscillator.frequency.value = f;
    }
}
synth.start();

export interface note{
    f: number;
    d: number;
}

export class Song{
    private notes: note[];
    pos: number;
    time: number;
    synth: Synth;
    r: boolean;
    constructor(n: note[], s: Synth, r = false) {
        this.notes = n;
        this.pos = 0;
        this.time = 0;
        this.synth = s;
        this.r = r;
    }
    play(){
        if(this.pos<this.notes.length){
            this.synth.play(this.notes[this.pos].f);
            this.pos++;
            setTimeout(()=>{
                this.play();
            }, this.notes[this.pos -1].d*1000);
        }
        else if(this.r){
            this.pos = 0;
            this.play();
        }

    }
}
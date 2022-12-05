(function(factory){typeof define==="function"&&define.amd?define(factory):factory()})((function(){
    "use strict";

const Notes=["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
let click=false;

function*noteGenerator(startNote){

    const pivot=Notes.indexOf(startNote);
    const layout=[...Notes.slice(pivot,Notes.length),...Notes.slice(0,pivot)];
    let octave=3;           //INITIAL OCTAVE
    let first=true;

    while(true){
        for(let i=0;i<layout.length;i++){
            const note=layout[i];
            if(note==="C"&&!first){octave=octave+1}yield{name:note,octave:octave};
            first=false
        }
    }
}

const NaturalWidth=10;const SharpWidth=6;

function sharpKey(note,octave,offset){
    return`<rect class="sharp-note note" data-note="${note}" data-octave="${octave}" x=${offset} y=1></rect>`
}

function naturalKey(note,octave,offset){
    return`<rect class="natural-note note" data-note="${note}" data-octave="${octave}" x=${offset} y=1></rect>`
}

class Piano extends HTMLElement{
    constructor(){
        super();
        this.root=this.attachShadow({mode:"open"});

       
            
        this.root.addEventListener("mouseover",event=>{
            this.handleClick(event,true);
            event.preventDefault()
        });

        this.root.addEventListener("mousedown",event=>{
            click=true;
            this.handleClick(event,true);
            event.preventDefault()
        });
           
        this.root.addEventListener("mouseup",event=>{
            this.handleClick(event,false);
            click=false;
            event.preventDefault()
        });

        this.root.addEventListener("mouseout",event=>{
            this.handleClick(event,false);
            event.preventDefault()
        });
        // this.root.innerHTML=`<link href="style.css" rel = "stylesheet"><div>${this.getNoteSvg()}`

    }

static get observedAttributes(){
    return["key-count","keyboard-layout","read-only"]
}

get config(){
    return{
        keyCount:parseInt(this.getAttribute("key-count")||"88"),keyboardLayout:this.getAttribute("keyboard-layout")||"A",readOnly:this.hasAttribute("read-only")
    }
}

connectedCallback(){}
attributeChangedCallback(){
    this.root.innerHTML=`<link href="style.css" rel = "stylesheet"><div>${this.getNoteSvg()}</div>`
}



handleClick(event,downOrMove){
    if(this.config.readOnly){return}const target=event.target;
    if(target.tagName==="rect"){
        const note=event.target.getAttribute("data-note");
        const octave=parseInt(event.target.getAttribute("data-octave"));

        if(downOrMove&&click){
            this.setNoteDown(note,octave);
            this.dispatchEvent(new CustomEvent("note-down",{
                detail:{
                    note:note+octave.toString()
                }
            }))
        }
        else{
            if(target.hasAttribute("data-active")){
                this.setNoteUp(note,octave);
                this.dispatchEvent(new CustomEvent("note-up",{
                    detail:{
                        note:note+octave.toString()
                    }
                }))
            }
        }
    }
}
setNoteDown(note,octave){
    const elem=this.root.querySelector(keySelector(note,octave));
    elem.classList.add("active");
    elem.setAttribute("data-active","data-active")
}

setNoteUp(note,octave){
    const elem=this.root.querySelector(keySelector(note,octave));
    elem.classList.remove("active");
    elem.removeAttribute("data-active")
}

getNoteSvg(){
    const noteCount=this.config.keyCount;
    const generator=noteGenerator(this.config.keyboardLayout);
    const notes=new Array(noteCount).fill(1).map(()=>generator.next().value);
    const naturalKeys=notes.filter(note=>!note.name.includes("#")).length;
    const lastKeySharp=notes[notes.length-1].name.includes("#");
    const totalWidth=naturalKeys*NaturalWidth+(lastKeySharp?SharpWidth/2:0)+2;
    return`<svg viewBox="0 0 ${totalWidth} 52" version="1.1" xmlns="http://www.w3.org/2000/svg">${this.getKeysForNotes(notes)}
    <defs>
    <linearGradient id="black-key-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#383838"></stop>
        <stop offset="0.025"></stop>
        <stop offset="0.039" stop-color="#121212"></stop>
        <stop offset="0.094" stop-color="#272727"></stop>
        <stop offset="0.852" stop-color="#585858"></stop>
        <stop offset="0.877" stop-color="#141414"></stop>
        <stop offset="0.887" stop-color="#343434"></stop>
        <stop offset="0.921" stop-color="#2b2b2b"></stop>
        <stop offset="1"></stop>
    </linearGradient>

<linearGradient id="white-key-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
    <stop offset="0" stop-color="#b5b5b5"></stop>
    <stop offset="0.015" stop-color="#fff"></stop>
    <stop offset="0.892" stop-color="#fff"></stop>
    <stop offset="0.913" stop-color="#f4f4f4"></stop>
    <stop offset="0.922" stop-color="#e0e0e0"></stop>
    <stop offset="0.965" stop-color="#faf8f8"></stop>
    <stop offset="0.974" stop-color="#fff"></stop>
    <stop offset="1" stop-color="hsl(227, 0%, 42%)"></stop>
</linearGradient>

<linearGradient id="white-key-gradient-active" x1="50%" y1="0%" x2="50%" y2="100%">
    <stop offset="0" stop-color="rgb(145, 145, 145)"></stop>
    <stop offset="0.892" stop-color="#bfbfbf"></stop>
    <stop offset="0.913" stop-color="#cccccc"></stop>
    <stop offset="0.922" stop-color="#d9d9d9"></stop>
    <stop offset="0.965" stop-color="#e6e6e6"></stop>
    <stop offset="0.974" stop-color="#f2f2f2"></stop>
    <stop offset="1" stop-color="hsl(227, 0%, 42%)"></stop>
</linearGradient>

<linearGradient id="black-key-gradient-active" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0%" stop-color="rgb(70, 70, 70)"></stop>
    <stop offset="100%" stop-color="hsl(227, 0%, 22%)"></stop>
</linearGradient>

<linearGradient id="white-key-hover" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#b5b5b5"></stop>
    <stop offset="0.015" stop-color="#fff"></stop>
    <stop offset="0.892" stop-color="#dbdbdb"></stop>
    <stop offset="0.913" stop-color="#f4f4f4"></stop>
    <stop offset="0.922" stop-color="#e0e0e0"></stop>
    <stop offset="0.965" stop-color="#faf8f8"></stop>
    <stop offset="0.974" stop-color="#ffffff"></stop>
    <stop offset="1" stop-color="hsl(227, 0%, 42%)"></stop>
</linearGradient>

<linearGradient id="black-key-hover" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#383838"></stop>
    <stop offset="0.025"></stop>
    <stop offset="0.039" stop-color="#121212"></stop>
    <stop offset="0.133" stop-color="#272727"></stop>
    <stop offset="0.852" stop-color="#343434"></stop>
    <stop offset="0.877" stop-color="#141414"></stop>
    <stop offset="0.887" stop-color="#343434"></stop>
    <stop offset="0.916" stop-color="#2b2b2b"></stop>
    <stop offset="100%" stop-color="hsl(227, 0%, 22%)"></stop>
</linearGradient>
    </svg>`
}

getKeysForNotes(notes){
    let totalOffset=-NaturalWidth+1;
    const offsets=notes.map(note=>{
        const isSharp=note.name.includes("#");
        let thisOffset=0;
        if(isSharp){thisOffset=totalOffset+7}
        else{
            totalOffset=totalOffset+NaturalWidth;
            thisOffset=totalOffset
        }
        return{note:note.name,octave:note.octave,offset:thisOffset}
    });

    const naturalKeys=offsets.filter(pos=>!pos.note.includes("#")).map(pos=>naturalKey(pos.note,pos.octave,pos.offset));
    const sharpKeys=offsets.filter(pos=>pos.note.includes("#")).map(pos=>sharpKey(pos.note,pos.octave,pos.offset));
    return`<g>\n${naturalKeys}\n${sharpKeys}\n</g>`
}

}

const keySelector=(note,octave)=>`[data-note="${note}"][data-octave="${octave}"]`;
customElements.define("piano-keys",Piano)}));
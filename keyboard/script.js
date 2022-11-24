// import * as Tone from 'tone'

const piano = document.getElementById("interactive-piano");

let note;

piano.addEventListener("note-down", (event) => {
    note=event.detail.note;
    console.log(note)
});






// import * as Tone from 'tone'

const piano = document.getElementById("interactive-piano");
const events = document.getElementById("events");

piano.addEventListener("note-down", (event) => events.innerHTML=JSON.stringify(event.detail));

piano.addEventListener("note-up", (event) => events.innerHTML="");



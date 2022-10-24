/* KEYBOARD */

const whiteKeyWidth = 80;
const blackKeyWidth = whiteKeyWidth / 2;
const pianoHeight = 400;
let range = ['A', 'C7'];

const naturalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const naturalSharpNotes = ['C', 'D', 'F', 'G', 'A'];
const naturalFlatNotes = ['D', 'E', 'G', 'A', 'B'];

const keyboard = {
    setupKeyboard(){
        const kb = document.querySelector('#piano');
        const allNaturalNotes = this.getAllNaturalNotes(range);
        const pianoWidth = allNaturalNotes * whiteKeyWidth;
        
        //SVG container
        const svg = this.createMainSVG(pianoWidth, pianoHeight);

        //white keys
        let whiteKeyPositionX = 0;
        allNaturalNotes.forEach(noteName => {

            const whiteKeyGroup = utils.createSVGElement('g');
            const whiteKey = this.createKey({className:'white-key', width: whiteKeyWidth, height:pianoHeight});
            const keyText = utils.createSVGElement('text');

            utils.addTextContent(text, noteName);

            utils.setAttributes(whiteKeyGroup, {'width': whiteKeyWidth});
            utils.setAttributes(text, {
                'x': whiteKeyPositionX + blackKeyWidth,
                'y': 380,
                'text-anchor': 'middle'
            });
        })
    }
}
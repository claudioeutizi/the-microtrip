// fetching the GET route from the Express server which matches the GET route from server.js

function NaturalKey(props) {

  return (
    <rect className = "natural-note note" data-note = {props.note} data-octave={props.octave} x={props.offset}>
    </rect>
  )
}

export default NaturalKey;
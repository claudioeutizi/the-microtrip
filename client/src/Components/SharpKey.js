// fetching the GET route from the Express server which matches the GET route from server.js

function SharpKey(props) {

  return (
    <rect className = "SharpKey" data-note = {props.note} data-octave={props.octave} x={props.offset}>
    </rect>
  )
}

export default SharpKey;
// fetching the GET route from the Express server which matches the GET route from server.js

function NaturalKey(props) {
  return (
      <rect className = "NaturalKey"
       key={props.dataNote} datanote = {props.dataNote} dataoctave={props.dataOctave} x={props.x} y={props.y}>
      </rect>
  )
}

NaturalKey.defaultProps = {
  y: 1
}

export default NaturalKey;
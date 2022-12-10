// fetching the GET route from the Express server which matches the GET route from server.js

function SharpKey(props) {

  return (
      <rect className = "SharpKey"
        datanote = {props.dataNote} dataoctave={props.dataOctave} x={props.x} y = {props.y}>
      </rect>
  )
}

SharpKey.defaultProps = {
  y: 1
}

export default SharpKey;
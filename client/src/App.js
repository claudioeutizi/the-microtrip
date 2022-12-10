import React, { useState } from 'react';
import Piano from './Components/Piano/Piano';
import { Display } from "react-7-segment-display";
import "./Styles/Keyboard.css"
// fetching the GET route from the Express server which matches the GET route from server.js

function App () {
  const [serialLight, setSerialLight] = useState([]);
  const [serialError, setSerialError] = useState("");

  React.useEffect(() => {
    fetch("http://localhost:9000/serialData/error")
      .then(res => res.text())
      .then(res => setSerialError(res))

    fetch("http://localhost:9000/serialData/light")
      .then(res => res.text())
      .then(res => setSerialLight(res))
  });

  return (
    <div className = "App">
      <h2>{serialLight}</h2>
      <h2>{serialError}</h2>
      <Display value = {27} color = "black" count = {3} skew = {7}/>
      <Piano keycount = {61} keyboardlayout = {"C"}/>
    </div>
  )
}

export default App;
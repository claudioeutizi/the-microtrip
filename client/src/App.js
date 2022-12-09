import React, { useState } from 'react';
import Piano from './Components/Piano';
import "./Styles/Keyboard.css"
// fetching the GET route from the Express server which matches the GET route from server.js

function App () {
  const [apiResponse, setApiResponse] = useState("");

  React.useEffect(() => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setApiResponse(res))
  });

  return (
    <div className = "App">
      <Piano keycount = {61} keyboardlayout = {"C"}/>
    </div>
  )
}

export default App;
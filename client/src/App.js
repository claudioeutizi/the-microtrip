import React, { useEffect, useState } from 'react';
import Piano from './Components/Piano/Piano';
import { Display } from "react-7-segment-display";
import "./Styles/Keyboard.css"
import io from "socket.io-client"

// fetching the GET route from the Express server which matches the GET route from server.js

function App () {
  useEffect(() => {
    const socket = io.connect("http://localhost:9000");
    socket.on("message", data => {
      console.log(data);
    })
  },[])

  return (
    <div className = "App">
      <Display value = {27} color = "black" count = {3} skew = {7}/>
      <Piano keycount = {61} keyboardlayout = {"C"}/>
    </div>
  )
}

export default App;
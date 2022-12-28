var express = require("express");
var io = require("../app").io;

var router = express.Router();
const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');
const moment = require('moment');

const serialPort = new SerialPort({path: 'COM9', baudRate: 115200,});
const parser = serialPort.pipe(new ReadlineParser({delimiter: '\n'}));

let error = false;

serialPort.on('open', () => {
  console.log('Serial port '+serialPort.path+ ' opened for micro:bit connection!');
})

serialPort.on('close', () => {
  console.log('Serial port '+serialPort.path+' closed!');
})

serialPort.on('error', () => {
    error = true;
})

parser.on('data', (data) => {
  let param = data.substring(0, data.indexOf(':'));
  let value = parseFloat(data.substring(data.indexOf(':')+1, data.length));
  switch(param){
    case "Light":
      io.emit("light-message", {
        value: value,
        timestamp: moment().format()
      })
      break;
    case "Temperature":
      io.emit("temperature-message", {
        value: value,
        timestamp: moment().format()
    })
      break;
    case "Humidity":
      io.emit("humidity-message", {
        value: value,
        timestamp: moment().format()
    })
  }
})

module.exports = router;
var express = require("express");
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

var lightValues = [];
var temperatureValues = [];
var humidityValues = [];

parser.on('data', (data) => {
  let param = data.substring(0, data.indexOf(':'));
  let value = data.substring(data.indexOf(':')+1, data.length);
  switch(param){
    case "Light":
      lightValues.push({
        light: value,
        timestamp: moment().format()
    })
      break;
    case "Temperature":
      temperatureValues.push({
        temperature: value,
        timestamp: moment().format()
    })
      break;
    case "Humidity":
      humidityValues.push({
        humidity: value,
        timestamp: moment().format()
    })
  }
})


router.get("/error", (request, response, next) => {
    if(error){
        response.send(error);
    }
});


router.get("/humidity", (request, response, next) => {
    response.send(humidityValues);
});

router.get("/light", (request, response, next) => {
    response.send(lightValues);
});

router.get("/temperature", (request, response, next) => {
    response.send(temperatureValues);
});

module.exports = router;
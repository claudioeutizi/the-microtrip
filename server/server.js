/* STARTING LOCALHOST WEB SERVER */
import express from 'express';
import {v4 as uuidv4} from 'uuid';
import {SerialPort} from 'serialport';
import {ReadlineParser} from '@serialport/parser-readline';
import moment from 'moment';
import * as path from 'path';

const express = require('express'); //Line 1
const server = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
server.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
server.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

//import serialport & declare vars

const serialPort = new SerialPort({path: 'COM9', baudRate: 115200,});
const parser = serialPort.pipe(new ReadlineParser({delimiter: '\n'}));

serialPort.on('open', () => {
  console.log('Serial port '+serialPort.path+ ' opened for micro:bit connection!');
})

serialPort.on('close', () => {
  console.log('Serial port '+serialPort.path+' closed!');
})

serialPort.on('error', () => {
  console.log('Error with the serial port '+serialPort.path+'!');
})

//parser data!
var lightValues = [];
var temperatureValues = [];
var humidityValues = [];

parser.on('data', (data) => {
  let param = data.substring(0, data.indexOf(':'));
  let value = data.substring(data.indexOf(':')+1, data.length);
  switch(param){
    case "Light":
      lightValues.push({
        id: uuidv4(),
        light: value,
        timestamp: moment().format()
    })
      break;
    case "Temperature":
      temperatureValues.push({
        id: uuidv4(),
        temperature: value,
        timestamp: moment().format()
    })
      break;
    case "Humidity":
      humidityValues.push({
        id: uuidv4(),
        humidity: value,
        timestamp: moment().format()
    })
  }
})

/* =============================================================UTILS GET===================================================*/

server.get('/api/light', (req, res) => {
  res.json(lightValues)
})

server.get('/api/temperature', (req, res) => {
  res.json(temperatureValues)
})

server.get('/api/humidity', (req, res) => {
  res.json(humidityValues)})

server.get('/api/humidity/:id', (request, response) => {
    const id = request.params.id;
    const hum = humidityValues.find(hum => hum.id === id)
    if(hum){
      response.json(hum)
   } else {
       response.status(404).end()
   }
})

server.get('/api/temperature/:id', (request, response) => {
  const id = request.params.id;
  const tem = temperatureValues.find(tem => tem.id === id)
  if(tem){
    response.json(tem)
 } else {
     response.status(404).end()
 }
})

server.get('/api/light/:id', (request, response) => {
  const id = request.params.id;
  const lig = temperatureValues.find(lig => lig.id === id)
  if(lig){
    response.json(lig)
 } else {
     response.status(404).end()
 }
})
/* ================================================================UTILS DELETE==================================================*/
server.delete('/api/humidity/:id', (request, response)=> {
  const id = request.params.id
  const hum = humidityValues.filter(hum => hum.id !== id)
  response.status(204).end()
})

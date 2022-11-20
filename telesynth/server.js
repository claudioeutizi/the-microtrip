/* STARTING LOCALHOST WEB SERVER */
import express from 'express';
import {SerialPort} from 'serialport';
import {ReadlineParser} from '@serialport/parser-readline';
const server = express();

server.get('/', (req, res) => {
  console.log("Here");
  res.send("hi!");
})

server.listen(3000);

let https;
try {
  https = await import('node:https');
} catch (err) {
  console.log('https support is disabled!');
}

//import serialport & declare vars

const port = new SerialPort({path: 'COM9', baudRate: 115200,});
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

port.on('open', () => {
  console.log('Serial port '+port.path+ ' opened for micro:bit connection!');
})

port.on('close', () => {
  console.log('Serial port '+port.path+' closed!');
})

port.on('error', () => {
  console.log('Error with the serial port '+port.path+'!');
})

port.on('resume', () => {
  console.log('Resuming connection with port '+port.path+'!');
})

// parser data!

parser.on('data', (data) => {
  let param = data.substring(0, data.indexOf(':'));
  let value = data.substring(data.indexOf(':')+1, data.length);
  switch(param){
    case "Light":
      console.log("the data is light and its value is " + value);
      break;
    case "Temperature":
      console.log("The data is temperature and its value is " + value);
      break;
    case "Humidity":
      console.log("The data is humidity and its value is " + value);
  }
})






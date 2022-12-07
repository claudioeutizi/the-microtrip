var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

//===============SERIAL PORT===========================
// import {SerialPort} from 'serialport';
// import {ReadlineParser} from '@serialport/parser-readline';
// import moment from 'moment';

// //==============UUID for keys
// import {v4 as uuidv4} from 'uuid';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// const serialPort = new SerialPort({path: 'COM9', baudRate: 115200,});
// const parser = serialPort.pipe(new ReadlineParser({delimiter: '\n'}));

// serialPort.on('open', () => {
//   console.log('Serial port '+serialPort.path+ ' opened for micro:bit connection!');
// })

// serialPort.on('close', () => {
//   console.log('Serial port '+serialPort.path+' closed!');
// })

// serialPort.on('error', () => {
//   console.log('Error with the serial port '+serialPort.path+'!');
// })

// /* ===========================================SERIAL=================================================*/
// var lightValues = [];
// var temperatureValues = [];
// var humidityValues = [];

// parser.on('data', (data) => {
//   let param = data.substring(0, data.indexOf(':'));
//   let value = data.substring(data.indexOf(':')+1, data.length);
//   switch(param){
//     case "Light":
//       lightValues.push({
//         id: uuidv4(),
//         light: value,
//         timestamp: moment().format()
//     })
//       break;
//     case "Temperature":
//       temperatureValues.push({
//         id: uuidv4(),
//         temperature: value,
//         timestamp: moment().format()
//     })
//       break;
//     case "Humidity":
//       humidityValues.push({
//         id: uuidv4(),
//         humidity: value,
//         timestamp: moment().format()
//     })
//   }
// })

// /* =============================================================UTILS GET===================================================*/

// server.get('/api/light', (req, res) => {
//   res.json(lightValues)
// })

// server.get('/api/temperature', (req, res) => {
//   res.json(temperatureValues)
// })

// server.get('/api/humidity', (req, res) => {
//   res.json(humidityValues)})

// server.get('/api/humidity/:id', (request, response) => {
//     const id = request.params.id;
//     const hum = humidityValues.find(hum => hum.id === id)
//     if(hum){
//       response.json(hum)
//    } else {
//        response.status(404).end()
//    }
// })

// server.get('/api/temperature/:id', (request, response) => {
//   const id = request.params.id;
//   const tem = temperatureValues.find(tem => tem.id === id)
//   if(tem){
//     response.json(tem)
//  } else {
//      response.status(404).end()
//  }
// })

// server.get('/api/light/:id', (request, response) => {
//   const id = request.params.id;
//   const lig = temperatureValues.find(lig => lig.id === id)
//   if(lig){
//     response.json(lig)
//  } else {
//      response.status(404).end()
//  }
// })
// /* ================================================================UTILS DELETE==================================================*/
// server.delete('/api/humidity/:id', (request, response)=> {
//   const id = request.params.id
//   const hum = humidityValues.filter(hum => hum.id !== id)
//   response.status(204).end()
// })

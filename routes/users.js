var express = require('express');
var router = express.Router();
const Official = require("../Model/official");
const Blue = require('../Model/blue');
var bodyParser = require('body-parser');
const cors = require('./cors');

router.use(bodyParser.json());
router.options(cors.cors, (req, res) => {return res.status(201);})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/official', cors.cors, (req, res, next) => {
  Official.find()
  .then(resp => {
    if (resp !== []) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: resp});
    }
  }, (err => next(err))).catch(err => next(err));
})

router.post('/official', cors.corsWithOption, (req, res, next) => {
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
const month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dt = new Date();
const date = dt.getDate();
const m = dt.getMonth();
const month = month_name[m];
const seconds = dt.getSeconds();
const year = dt.getFullYear();
const hour = dt.getHours();
const d = dt.getDay()
const day = days[d];
const minute = dt.getMinutes();
let time;
if ( minute < 10) {
  minute = '0' + minute;
}
if (hour > 12) {
  time = `${hour - 12}:${minute}:${seconds}PM`
} else {
  time = `${hour}:${minute}:${seconds}AM`
}

  Official.find()
  .then(offresp => {
      console.log("off", req.body)
      const obj = {
        venta: req.body.venta,
        compra: req.body.compra,
        month: month,
        year: year,
        day : day,
        hour: hour,
        minute: minute,
        time: time,
        nombre: req.body.nombre
      }
      Official.create(obj)
      .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true});
      }, (err => next(err))).catch(err => next(err));
    })
})

router.put('/official', cors.corsWithOption, (req, res, next) => { 
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
  const dt = new Date();
  const date = dt.getDate();
  const d = dt.getDay();
  const day = days[d]
  const hour = dt.getHours();
  const minute = dt.getMinutes();
  console.log(req.body)
  Official.findOneAndUpdate({day: day}, {$set: {venta: req.body.venta, compra: req.body.compra, nombre: req.body.nombre, minute: minute, hour: hour}}, {new: true})
  .then(resp => {
    if (resp) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true});
    } else {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false})
    }
  }, (err => console.log(err))).catch(err => console.log(err));
})

// BLUE api-endpoint

router.get('/blue', cors.cors, (req, res, next) => {
  Blue.find()
  .then(resp => {
    if (resp !== [] || resp !== null) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: resp});
    }
  }, (err => next(err))).catch(err => next(err));
})

router.post('/blue', cors.corsWithOption, (req, res, next) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
  const month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dt = new Date();
  const date = dt.getDate();
  const m = dt.getMonth();
  const month = month_name[m];
  const seconds = dt.getSeconds();
  const year = dt.getFullYear();
  const hour = dt.getHours();
  const d = dt.getDay()
  const day = days[d];
  const minute = dt.getMinutes();

  console.log("blue", req.body)
  Blue.find()
  .then(offresp => {
    const obj = {
      venta: req.body.venta,
      compra: req.body.compra,
      month: month,
      year: year,
      day : day,
      hour: hour,
      minute: minute,
      time: req.body.time,
      nombre: req.body.nombre
    }
    Blue.create(obj)
    .then(resp => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true});
    }, (err => next(err))).catch(err => next(err));
  })
})


/* router.put('/blue', cors.corsWithOption, (req, res, next) => { 
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
  const dt = new Date();
  const d = dt.getDay();
  const day = days[d]
  const hour = dt.getHours();
  const minute = dt.getMinutes();

  Blue.findOneAndUpdate({day: day}, {$set: {venta: req.body.venta, compra: req.body.compra, nombre: req.body.nombre, minute: minute, hour: hour}}, {new: true})
  .then(resp => {
    if (resp) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true});
    } else {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true});
    }
  })
})
 */
module.exports = router;

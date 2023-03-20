const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bluedolSchema = new Schema({
  venta: {
    type: String
  },
  compra: {
    type: String
  },
  day: {
    type: String
  },
  month: {
    type: String
  },
  year: {
    type: String
  },
  hour: {
    type: String
  },
  minute: {
    type: String
  },
  time: {
    type: String
  },
  nombre: {
    type: String
  }

}, {timestamps: true});

const Blue = mongoose.model('blue', bluedolSchema);

module.exports = Blue;

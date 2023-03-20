const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const officialdolSchema = new Schema({
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

const Official = mongoose.model('official', officialdolSchema);
module.exports = Official;

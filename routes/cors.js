const cors = require('cors');

const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://stunning-otter-2575f0.netlify.app/'];

const corsDelegate = (req, cb) => {
  var corsOption;
  if (whitelist.indexOf(req.header('Origin')) != -1) {
    corsOption= {origin: true}
  } else {
    corsOption = {origin: false};
  }
  cb(null, corsOption);
}

exports.cors = cors();
exports.corsWithOption = cors(corsDelegate);
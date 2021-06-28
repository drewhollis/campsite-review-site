const cors = require("cors");

const whitelist = ["http://localhost:3000", "https://localhost:3443"];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  console.log(req.header("Origin"));
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; //checking if origin is found in whitelist and allowing request to be accepted
  } else {
    corsOptions = { origin: false }; // not allowing request to be accepted
  }
  callback(null, corsOptions);
};

exports.cors = cors(); //allows cores with all origins
exports.corsWithOptions = cors(corsOptionsDelegate); //checks to see if request belongs to whitlisted orgins

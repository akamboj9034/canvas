var express = require('express');
var router = express.Router();


var kafka = require('./kafka/client');
router.post('/', function (req, res) {

  kafka.make_request("login", req, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  });

});
module.exports = router;

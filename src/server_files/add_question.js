var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const passport = require('passport');

var kafka = require('./kafka/client');

router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {

  kafka.make_request("addQuestion", req, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  });

});



module.exports = router;

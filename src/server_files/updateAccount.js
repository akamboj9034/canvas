var express = require('express');
var router = express.Router();

const User = require('../models/Signup_model');
const passport = require('passport');
var kafka = require('./kafka/client');
router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {

  kafka.make_request("updateAccountInfo", req, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  });




});
module.exports = router;
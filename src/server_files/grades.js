var express = require('express');
var router = express.Router();


var kafka = require('./kafka/client');
const passport = require('passport');
router.get('/:course_id', passport.authenticate('jwt', { session: false }), function (req, res) {

  kafka.make_request("grades", req, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  });




});



module.exports = router;

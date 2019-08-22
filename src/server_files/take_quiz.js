var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
const passport = require('passport');
router.get('/:quiz_id', passport.authenticate('jwt', { session: false }), function (req, res) {

  kafka.make_request("takeQuiz", req, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  });



});



module.exports = router;

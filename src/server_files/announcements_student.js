var express = require('express');
var router = express.Router();
const passport = require('passport');


var kafka = require('./kafka/client');
router.get('/:course_id', passport.authenticate('jwt', { session: false }), function (req, res) {

  kafka.make_request("announcementsStudent", req, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  });



});



module.exports = router;

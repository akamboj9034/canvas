var express = require('express');
var router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./../public/web/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage })
const mongoose = require('mongoose');
const Submission = require('../models/Submissions_model');
const passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), upload.single('myfile'), function (req, res) {

  console.log("inside submit assignment");
  console.log(req.body);




  const submission = new Submission({

    _id: new mongoose.Types.ObjectId(),
    file_name: req.body.file_name,
    assignment_id: req.body.assignment_id,
    assignment_name: req.body.assignment_name,
    course_id: req.body.course_id,
    submitted_by: req.session.user,
    graded: "no"

  });
  submission.save().then(resul => {
    res.send("file uploaded");
    console.log(resul);
    console.log("submission added");

  })
    .catch(err => {
      console.log(err);


    });

});



module.exports = router;

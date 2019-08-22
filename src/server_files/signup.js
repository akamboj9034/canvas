

var express = require('express');
var router = express.Router();

const User = require('../models/Signup_model');

var mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT = require('jsonwebtoken');

router.post('/', function (req, res) {

  console.log("Inside Signup Post Request");
  console.log("Req Body : ", req.body);

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    const user = new User({

      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      password: hash,
      user_type: req.body.user_type,
      email: "",
      phone: "",
      about_me: "",
      city: "",
      country: "",
      company: "",
      school: "",
      hometown: "",
      languages: "",
      gender: "",
      profile_image: ""

    });
    user.save().then(resul => {
      console.log(resul);


      const token = JWT.sign({
        iss: 'codeWorkr',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)

      }, 'codeauthenticate');







      // res.cookie('username',req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
      res.cookie('user_type', req.body.user_type, { maxAge: 900000, httpOnly: false, path: '/' });
      req.session.user = req.body.username;
      req.session.user_type = req.body.user_type;
      var send = "[" + JSON.stringify(req.body) + "]";

      res.json({ token: 'JWT ' + token, username: req.body.username, user_type: req.body.user_type });
    })
      .catch(err => {
        console.log(err);


      });




    console.log("user inserted in table");






  });
});
module.exports = router;

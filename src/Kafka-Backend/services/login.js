var express= require('express');
var router=express.Router();

const User =require('../../models/Signup_model');



const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT= require('jsonwebtoken');

const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){

    console.log("Inside Login Post Request");
    console.log("message Body : ",message.body);
  
    User.findOne({username:message.body.username},function(err,doc){  
      if(doc)
      {
  
        console.log("doc found");
        
        bcrypt.compare(message.body.password, doc.password, function(err, res1) {
          // res == true
  
          if(res1==true){

            const token=  JWT.sign({
              iss:'codeWorkr',
              sub:doc._id,
              iat: new Date().getTime(),
              exp: new Date().setDate(new Date().getDate()+1)
        
            }, 'codeauthenticate');
         
       



            // res.cookie('username',message.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('user_type',doc.user_type,{maxAge: 900000, httpOnly: false, path : '/'});
            message.session.user = message.body.username;
            // res.writeHead(200,{
            //     'Content-Type' : 'text/plain'
            // })
            var send={
              token:'JWT '+token,
              username:doc.username,
              user_type:doc.user_type
            };

            console.log("send: ",send);
            callback(null, JSON.stringify(send));   
            // res.send(JSON.stringify(send));
    console.log("logged in");
    console.log( doc.user_type);


          }
          else{
            
    console.log("incorrect password");
            // res.send({
            //   "code":204,
            //   "success":"Email and password does not match"
            //     });
            callback(null, "Email and password does not match");   
          }
  
      });
  
      }else{
  
        console.log("No user found");
        callback(null, "no user"); 
        // res.send("no user");
      }
  
  
    });
}
exports.handle_request = handle_request;

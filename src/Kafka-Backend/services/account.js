var express= require('express');

const User =require('../../models/Signup_model');
const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){

    console.log("getting data for account info");
    console.log('MESSAGE SESSION USER', message.query.user);
    User.find({username:message.query.user}).exec()
    .then(doc => {
      if(doc)
      {
        console.log("doc found");
        console.log(doc);
        callback(null, JSON.stringify(doc));      }
    })
    .catch(err=>{
  
      console.log(err);
      callback(err, null);
    });
  
    
  
  }




exports.handle_request = handle_request;

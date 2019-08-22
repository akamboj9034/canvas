var express= require('express');
var router=express.Router();

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
    console.log("updating enrolled data");

    User.update({username:message.session.user},{ $set:{courses_enrolled:message.body.courses} }).exec()
    .then(result=>{
      console.log("mongo: ",result);
      console.log("courses array is updated");
      callback(null, "updated");   
    })
    .catch(err => {
    
      console.log(err);
    });
    
  
}




exports.handle_request = handle_request;

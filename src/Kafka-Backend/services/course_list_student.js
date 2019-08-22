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
    console.log("getting data for student enrollment info");


    User.find({username:message.query.user},function(err,doc){
  
      if(doc)
      {
        console.log("doc found");
        console.log(doc[0].courses_enrolled);
        callback(null, JSON.stringify(doc[0].courses_enrolled)); 
      }
    });
  
  
  
}



exports.handle_request = handle_request;
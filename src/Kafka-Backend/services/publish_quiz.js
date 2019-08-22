var express= require('express');
var router=express.Router();

const Quiz =require('../../models/Quiz_model');

const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){

  
    console.log("inside the publish quiz request");
    console.log(message.body);
    
    
    
    Quiz.update({_id:message.body.quiz_id},{ $set:{publish:"yes"} }).exec()
    .then(result=>{
      console.log("mongo: ",result);
      callback(null, "quiz is published"); 
      console.log("quiz published");
    })
    .catch(err => {
    
      console.log(err);
    });
  
}


exports.handle_request = handle_request;

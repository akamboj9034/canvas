var express= require('express');
var router=express.Router();

const Submission =require('../../models/Submissions_model');
const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){
    console.log("inside the grade assignment request");
    console.log(message.body);
    
    
    
    Submission.update({_id:message.body.submission_id},{ $set:{graded:message.body.grade} }).exec()
    .then(result=>{
      console.log("mongo: ",result);
      callback(null, "assignment graded"); 
      console.log("assignment graded");
    })
    .catch(err => {
    
      console.log(err);
    });
    
}



exports.handle_request = handle_request;

var express= require('express');
var router=express.Router();

const User =require('../../models/Signup_model');
const Course =require('../../models/Courses_model');


const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){


    console.log("Inside remove enrollment Request");
    console.log("message Body : ",message.body);
  
  
  
  
    User.updateOne({username:message.session.user},{ $pull: { courses_enrolled: { $in: [ message.body.course_id] }, vegetables: "carrots" } },
    { multi: true }).exec()
    .then(result=>{
      console.log("mongo: ",result);
      console.log("user enrollment is updated");
      callback(null, "removed");  
    })
    .catch(err => {
    
      console.log(err);
    });
    
  
    Course.update({course_id:message.body.course_id},{ $inc:{space_left:1} }).exec()
    .then(result=>{
      console.log("mongo: ",result);
      console.log("space left is updated");
    })
    .catch(err => {
    
      console.log(err);
    });
    
  
    

}
exports.handle_request = handle_request;

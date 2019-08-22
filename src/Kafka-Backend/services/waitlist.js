var express= require('express');
var router=express.Router();

const Waitlist =require('../../models/Waitlist_model');
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

    console.log("Inside waitlist course Request");
    console.log("message Body : ",message.body);
  
  
  
  
    const waitlist=new Waitlist({
  
      _id: new mongoose.Types.ObjectId(),
      course_id: message.body.course_id,
      username:message.session.user,
      permission_code:0
    });
    waitlist.save().then(resul =>{
      console.log(resul);
      callback(null,"waitlisted");   
      console.log(JSON.stringify(resul));
  
    })
    .catch(err => {
      console.log(err);
     
    
    });
  
  
  
    Course.update({course_id:message.body.course_id},{ $inc:{in_waitlist:1} }).exec()
    .then(result=>{
      console.log("mongo: ",result);
      console.log("in waitlist is updated");
    })
    .catch(err => {
    
      console.log(err);
    });
    
    
    
  
    

}

exports.handle_request = handle_request;
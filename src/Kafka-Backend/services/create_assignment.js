var express= require('express');
var router=express.Router();

const Assignment =require('../../models/Assignments_model');
const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){

   
    console.log("inside the add assignment request");
    console.log(message.body);
    
    
    
    const assignment=new Assignment({
    
      _id: new mongoose.Types.ObjectId(),
      assignment_name: message.body.assignment_name,
      assignment_requirements:message.body.assignment_requirements,
      course_id:message.body.course_id,
      assignment_duedate:message.body.assignment_duedate,
      assignment_points:message.body.assignment_points,
      created_by:message.session.user
    
    });
    assignment.save().then(resul =>{
      console.log(resul);
      callback(null, "assignment created"); 
      console.log("assignment inserted");
    
    })
    .catch(err => {
      console.log(err);
     
    
    });
    
}


exports.handle_request = handle_request;

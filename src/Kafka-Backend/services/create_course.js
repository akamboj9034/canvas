var express= require('express');
var router=express.Router();

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
    console.log("Inside create course Post Request");
    console.log("message Body : ",message.body);
  
  
  
    const course=new Course({
  
      _id: new mongoose.Types.ObjectId(),
      course_id: message.body.course_id,
      course_name:message.body.course_name,
      course_description:message.body.course_description,
      course_dept:message.body.course_dept,
      course_room:message.body.course_room,
      course_capacity:message.body.course_capacity,
      waitlist_capacity:message.body.waitlist_capacity,
      course_term:message.body.course_term,
      space_left:message.body.course_capacity,
      in_waitlist:0,
      created_by:message.session.user
    });
    course.save().then(resul =>{
      console.log(resul);
      callback(null, "course created");  
      console.log("course created in table");
     
            
    })
    .catch(err => {
      console.log(err);
      callback(null,"course already exists");  
      console.log("course already exists");
    
    });
  
  
  

}
exports.handle_request = handle_request;

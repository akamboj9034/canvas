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
    console.log("Inside create quiz Request");
    console.log("message Body : ",message.body);
  
  
  
  
    const quiz=new Quiz({
  
      _id: new mongoose.Types.ObjectId(),
      quiz_name: message.body.quiz_name,
      created_by:message.session.user,
      course_id:message.body.course_id,
      publish:"no"
  
    });
    quiz.save().then(resul =>{
      callback(null, "Quiz is created");   
      console.log("Quiz is created");
  
    })
    .catch(err => {
      console.log(err);
     
    
    });
  
}



exports.handle_request = handle_request;

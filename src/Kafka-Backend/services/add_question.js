var express= require('express');

const mongoose= require('mongoose');


const Questions =require('../../models/Questions_model');


mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){
  
    console.log("inside the add question request");
    console.log(message.body);
    
    
    
    
    
    const question=new Questions({
    
      _id: new mongoose.Types.ObjectId(),
      quiz_id: message.body.quiz_id,
      question_name:message.body.question_name,
      option_a:message.body.option_a,
      option_b:message.body.option_b,
      option_c:message.body.option_c,
      option_d:message.body.option_d,
      correct_answer:message.body.correct_answer,
    
    });
    question.save().then(resul =>{
      console.log(resul);
      callback(null, "question inserted"); 

          console.log("question inserted");
    
    })
    .catch(err => {
      console.log(err);
      callback(err, null);
    
    });
  
}


exports.handle_request = handle_request;
var express= require('express');
var router=express.Router();

const Scores =require('../../models/Scores_model');
const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){
    console.log("inside the take_test request");
    console.log(message.body);
    
    const scores=new Scores({
    
      _id: new mongoose.Types.ObjectId(),
      quiz_id: message.body.quiz_id,
      taken_by:message.session.user,
      score:message.body.score
    
    });
    scores.save().then(resul =>{
      console.log(resul);
      callback(null, "score created");   
      console.log("score inserted");
    
    })
    .catch(err => {
      console.log(err);
     
    
    });
    
}



exports.handle_request = handle_request;


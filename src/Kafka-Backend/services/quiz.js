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
    console.log("getting data for quiz info");



    Quiz.find({created_by:message.session.user},function(err,doc){
  
      if(doc)
      {
        console.log("doc found");
        console.log(doc);
        callback(null, JSON.stringify(doc));  
      }
    });
  
  
}



exports.handle_request = handle_request;

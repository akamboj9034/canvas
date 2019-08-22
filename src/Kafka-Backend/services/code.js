var express= require('express');
var router=express.Router();

const Waitlist =require('../../models/Waitlist_model');

const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){

    console.log("Inside code generation Request");
    console.log("Req Body : ",message.body);
    var code= Math.floor(Math.random() * (20000 - 12000)) + 12000; 
    console.log("the code is" +code);
  
  
    Waitlist.updateOne({username:message.body.username,course_id:message.body.course_id},{ $set:{permission_code:code} }).exec()
    .then(result=>{
      callback(null, "code given");  
      console.log("data updated");
      console.log(JSON.stringify(result));
    })
    .catch(err => {
    
      console.log(err);
    });
    
  

}

exports.handle_request = handle_request;


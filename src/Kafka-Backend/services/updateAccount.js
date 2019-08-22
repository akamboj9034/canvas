var express= require('express');


const User =require('../../models/Signup_model');
const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){

    console.log("Inside profile update messageuest");
    console.log("message Body : ",message.body);
  
  User.update({username:message.body.username},{ $set:{email:message.body.email,phone:message.body.phone,about_me:message.body.about_me,city:message.body.city,country:message.body.country,company:message.body.company,school:message.body.school,hometown:message.body.hometown,languages:message.body.languages,gender:message.body.gender} }).exec()
  .then(result=>{
    console.log("mongo: ",result);
    var send="["+JSON.stringify(message.body)+"]";
    callback(null, send);  
  })
  .catch(err => {
  
    console.log(err);
    callback(err, null);
  });
  
  

}

exports.handle_request = handle_request;
var express= require('express');
var router=express.Router();

const Announcement =require('../../models/Announcements_model');
const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){
    console.log("Inside make announcement post Request");
    console.log("message Body : ",message.body);
    var datetime = new Date();
  
    const announcement=new Announcement({
  
      _id: new mongoose.Types.ObjectId(),
      announcement: message.body.announcement,
      created_by:message.session.user,
      course_id:message.body.course_id,
      created_at:datetime
  
    });
    announcement.save().then(resul =>{
      console.log(resul);
      console.log("announcement added");
      console.log(JSON.stringify(resul));
      callback(null, "DONE");   
  
    })
    .catch(err => {
      console.log(err);
     
    
    });
  

}
exports.handle_request = handle_request;

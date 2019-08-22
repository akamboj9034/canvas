

const User =require('../../models/Signup_model');
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

    console.log("Inside apply code Request");
    console.log("Req Body : ",message.body);
  
  
    Waitlist.remove({username:message.session.user,course_id:message.body.course_id}).exec()
    .then(result=>{
      console.log(result);
      callback(null, "waitlist removed");  
      console.log("waitlist removed");
    })
    .catch(err=>{
      callback(err, null);
    });
    
  
  
  
    User.updateOne({username:message.session.user},{ $push: { courses_enrolled: message.body.course_id } }).exec()
    .then(result=>{
      console.log("mongo: ",result);
    console.log("courses_enrolled is updated");
    })
    .catch(err => {
    
      callback(err, null);
    });
    
}




exports.handle_request = handle_request;

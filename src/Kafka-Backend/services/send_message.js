var express= require('express');
var router=express.Router();

const Inbox =require('../../models/Inbox_model');


const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
.then(result => {
  console.log('Connected');
})
.catch(err =>{
  console.log(err);
});


function handle_request(message, callback){

    let date = require('date-and-time');
    let now = new Date();
    let print_date=date.format(now, 'hh:mm A MMM DD YYYY'); 
  
    console.log(print_date);
  const inbox=new Inbox({
  
    _id: new mongoose.Types.ObjectId(),
    to: message.body.to,
    from:message.session.user,
    message:message.body.message,
    date:print_date
  
  });
  inbox.save().then(resul =>{
    console.log(resul);
    console.log("message added");
    console.log(JSON.stringify(resul));
    callback(null, "sent");  
  
  })
  .catch(err => {
    console.log(err);
   
  
  });
    

}
exports.handle_request = handle_request;

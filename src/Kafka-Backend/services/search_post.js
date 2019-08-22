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

    console.log('Inside Search GET: ', message.body);

    if(message.body.filter=="id")
    {
    
      Course.find({course_id:{$regex: "^"+message.body.search}},function(err,doc){
    
        if(doc)
        {
          console.log("doc found");
          console.log(doc);
          callback(null, JSON.stringify(doc));   
        }
      });
    
    }
    
    if(message.body.filter=="name")
    {
    
      Course.find({course_name:{$regex: "^"+message.body.search}},function(err,doc){
    
        if(doc)
        {
          console.log("doc found");
          console.log(doc);
          callback(null, JSON.stringify(doc));   
        }
      });
    
    }
    if(message.body.filter=="greater")
    {
    
      Course.find({course_id:{$gt:message.body.search}},function(err,doc){
    
        if(doc)
        {
          console.log("doc found");
          console.log(doc);
          callback(null, JSON.stringify(doc));   
        }
      });
    
    }
    
    if(message.body.filter=="less")
    {
    
      Course.find({course_id:{$lt:message.body.search}},function(err,doc){
    
        if(doc)
        {
          console.log("doc found");
          console.log(doc);
          callback(null, JSON.stringify(doc));   
        }
      });
    
    }

}
exports.handle_request = handle_request;

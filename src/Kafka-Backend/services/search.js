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

    console.log('Inside search courses GET');
console.log("skip info: ",message.query.page);
let skip= message.query.page*5;
    Course.find({},[null],{limit:5,skip},function(err,doc){
  
      if(doc)
      {
        console.log("doc found");
        console.log(doc);
        if(doc[0]==null)
        {
          console.log("no docs with data");
          callback(null, "error");   
        }else{
          callback(null, JSON.stringify(doc));   

        }
     
      }
    });
  
    
  
}




exports.handle_request = handle_request;

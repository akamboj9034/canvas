var express= require('express');
var router=express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./../public/web/",
  filename: function(req, file, cb){
     cb(null,file.originalname);
  }
});
 
var upload = multer({ storage: storage })
const mongoose= require('mongoose');
const File =require('../models/Files_model');
const Course =require('../models/Courses_model');

router.post('/',upload.single('myfile'),function(req,res){
  
    console.log("inside upload file yo");
    console.log(req.body.file_name);
  
  
  
    const file=new File({
  
      _id: new mongoose.Types.ObjectId(),
      file_name: req.body.file_name,
      created_by:req.session.user,
      course_id:req.body.course_id
  
    });
    file.save().then(resul =>{
      console.log(resul);
      res.send("file uploaded");
        console.log("file uploaded");
  
    })
    .catch(err => {
      console.log(err);
     
    
    });
    
});




router.get('/',function(req,res){
  
  console.log("getting data for upload file courses info");




  Course.find({created_by:req.session.user},function(err,doc){

    if(doc)
    {
      console.log("doc found");
      console.log(doc);
      res.end(JSON.stringify(doc))
    }
  });

  
});


module.exports=router;

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
const User =require('../models/Signup_model');


router.post('/',upload.single('dp'),function(req,res){
  
    console.log("inside upload");
    console.log(req.body.image_name);
    console.log("username: ",req.body.username);
  
    User.update({username:req.query.user},{ $set:{profile_image:req.body.image_name} }).exec()
    .then(result=>{
            console.log("mongo: ",result);
            console.log("uploaded");
  
                    User.find({username:req.query.user},function(err,doc){
  
                      if(doc)
                      {
                        console.log("doc found");
                        console.log(doc);
                        res.end(JSON.stringify(doc))
                      }
                    });
                  
  
  
  
    })
    .catch(err => {
    
      console.log(err);
    });
    
});



module.exports=router;

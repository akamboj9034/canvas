//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

var cors = require('cors');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var cookies = require('cookies');

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./../public/web/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage })

var app = express()



//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
  secret: 'cmpe273_kafka_passport_mongo',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

var mysql = require('mysql');

var con = mysql.createPool({
  connectionLimit: 152,
  host: "localhost",
  user: "root",
  password: "",
  database: "canvas"
});

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql!");
 
  });*/



const bcrypt = require('bcrypt');
const saltRounds = 10;


const User = require('./models/Signup_model');
const Course = require('./models/Courses_model');
const Waitlist = require('./models/Waitlist_model');
const Announcement = require('./models/Announcements_model');
const Assignment = require('./models/Assignments_model');
const Enrolled = require('./models/Enrolled_model');
const Questions = require('./models/Questions_model');
const Quiz = require('./models/Quiz_model');
const Scores = require('./models/Scores_model');
const Submission = require('./models/Submissions_model');
const File = require('./models/Files_model');
const Inbox = require('./models/Inbox_model');



const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbadmin:Ammy@9034@canvas-tj9cv.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
  .then(result => {
    console.log();
  })
  .catch(err => {
    console.log(err);
  });

const JWT = require('jsonwebtoken');
const passport = require('passport');
app.use(passport.initialize());


var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = 'codeauthenticate';


passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
}));








const login = require('./server_files/login');
const signup = require('./server_files/signup');
const account = require('./server_files/account');
const create_course = require('./server_files/create_course');
const course_list_faculty = require('./server_files/course_list_faculty');
const in_waitlist = require('./server_files/in_waitlist');
const search = require('./server_files/search');
const code = require('./server_files/code');
const enrolled = require('./server_files/enrolled');
const remove = require('./server_files/remove');
const announcements_faculty = require('./server_files/announcements_faculty');
const announcements_student = require('./server_files/announcements_student');
const make_announcement = require('./server_files/make_announcement');
const enroll = require('./server_files/enroll');
const course_list_student = require('./server_files/course_list_student');
const recipients = require('./server_files/recipients');
const sent_messages = require('./server_files/sent_messages');
const inbox = require('./server_files/inbox');
const send_message = require('./server_files/send_message');
const remove_course = require('./server_files/remove_course');
const waitlist = require('./server_files/waitlist');
const courses = require('./server_files/courses');
const all_enrolled = require('./server_files/all_enrolled');
const update_enrolled = require('./server_files/update_enrolled');
const quiz = require('./server_files/quiz');
const create_quiz = require('./server_files/create_quiz');
const publish_quiz = require('./server_files/publish_quiz');
const quiz_questions = require('./server_files/quiz_questions');
const add_question = require('./server_files/add_question');
const quiz_list = require('./server_files/quiz_list');
const take_quiz = require('./server_files/take_quiz');
const files_faculty = require('./server_files/files_faculty');
const upload_file = require('./server_files/upload_file');
const assignments_faculty = require('./server_files/assignments_faculty');
const create_assignment = require('./server_files/create_assignment');
const assignments_student = require('./server_files/assignments_student');
const show_assignment_faculty = require('./server_files/show_assignment_faculty');
const show_submissions = require('./server_files/show_submissions');
const grade_assignment = require('./server_files/grade_assignment');
const previous_submissions = require('./server_files/previous_submissions');
const show_waitlist = require('./server_files/show_waitlist');
const take_test = require('./server_files/take_test');
const apply_code = require('./server_files/apply_code');
const grades = require('./server_files/grades');
const files_student = require('./server_files/files_student');
const show_course = require('./server_files/show_course');
const submit_assignment = require('./server_files/submit_assignment');
const dp = require('./server_files/dp');
const updateAccount = require('./server_files/updateAccount');
const create_quiz_post = require('./server_files/create_quiz_post');
const make_announcement_post = require('./server_files/make_announcement_post');
const search_post = require('./server_files/search_post');



app.use('/login', login)
app.use('/signup', signup)
app.use('/account', account)
app.use('/create_course', create_course)
app.use('/course_list_faculty', course_list_faculty)
app.use('/in_waitlist', in_waitlist)
app.use('/search', search)
app.use('/code', code)
app.use('/enrolled', enrolled)
app.use('/remove', remove)
app.use('/announcements_faculty', announcements_faculty)
app.use('/announcements_student', announcements_student)
app.use('/make_announcement', make_announcement)
app.use('/enroll', enroll)
app.use('/course_list_student', course_list_student)
app.use('/recipients', recipients)
app.use('/sent_messages', sent_messages)
app.use('/inbox', inbox)
app.use('/send_message', send_message)
app.use('/remove_course', remove_course)
app.use('/waitlist', waitlist)
app.use('/courses', courses)
app.use('/all_enrolled', all_enrolled)
app.use('/update_enrolled', update_enrolled)
app.use('/quiz', quiz)
app.use('/create_quiz', create_quiz)
app.use('/publish_quiz', publish_quiz)
app.use('/quiz_questions', quiz_questions)
app.use('/add_question', add_question)
app.use('/quiz_list', quiz_list)
app.use('/take_quiz', take_quiz)
app.use('/files_faculty', files_faculty)
app.use('/upload_file', upload_file)
app.use('/assignments_faculty', assignments_faculty)
app.use('/create_assignment', create_assignment)
app.use('/assignments_student', assignments_student)
app.use('/show_assignment_faculty', show_assignment_faculty)
app.use('/show_submissions', show_submissions)
app.use('/grade_assignment', grade_assignment)
app.use('/previous_submissions', previous_submissions)
app.use('/show_waitlist', show_waitlist)
app.use('/take_test', take_test)
app.use('/apply_code', apply_code)
app.use('/grades', grades)
app.use('/files_student', files_student)
app.use('/show_course', show_course)
app.use('/submit_assignment', submit_assignment)
app.use('/dp', dp)
app.use('/updateAccount', updateAccount)
app.use('/create_quiz_post', create_quiz_post)
app.use('/make_announcement_post', make_announcement_post)
app.use('/search_post', search_post)

// //Route to handle Post Request Call
// app.get('/account',function(req,res){

//   console.log("getting data for account info");

//   User.find({username:req.session.user}).exec()
//   .then(doc => {
//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   })
//   .catch(err=>{

//     console.log(err);
//   });






// con.query("SELECT * FROM users WHERE username = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//   console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });


// });




//Route to handle Post Request Call for profile update
// app.post('/account',function(req,res){

//   console.log("Inside profile update Request");
//   console.log("Req Body : ",req.body);

// User.update({username:req.session.user},{ $set:{email:req.body.email,phone:req.body.phone,about_me:req.body.about_me,city:req.body.city,country:req.body.country,company:req.body.company,school:req.body.school,hometown:req.body.hometown,languages:req.body.languages,gender:req.body.gender} }).exec()
// .then(result=>{
//   console.log("mongo: ",result);
//   var send="["+JSON.stringify(req.body)+"]";
//   res.send(send);
// })
// .catch(err => {

//   console.log(err);
// });


// var sql= "update users set email=?,phone=?,aboutme=?,city=?,country=?,company=?,school=?,hometown=?,languages=?,gender=? where username=?";

//   con.query(sql,[req.body.email,req.body.phone,req.body.about_me,req.body.city,req.body.country,req.body.company,req.body.school,req.body.hometown,req.body.languages,req.body.gender,req.session.user], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       var send="["+JSON.stringify(req.body)+"]";
//       res.send(send);
//       console.log("data updated");
//       console.log(JSON.stringify(result));
//       console.log(req.session.user);
//       console.log(req.session.id);
//       // console.log('The solution is: ', results);

//     }
//   });


// });





//Route to handle create course Request Call
// app.post('/create_course',function(req,res){

// console.log("Inside create course Post Request");
// console.log("Req Body : ",req.body);



// const course=new Course({

//   _id: new mongoose.Types.ObjectId(),
//   course_id: req.body.course_id,
//   course_name:req.body.course_name,
//   course_description:req.body.course_description,
//   course_dept:req.body.course_dept,
//   course_room:req.body.course_room,
//   course_capacity:req.body.course_capacity,
//   waitlist_capacity:req.body.waitlist_capacity,
//   course_term:req.body.course_term,
//   space_left:req.body.course_capacity,
//   created_by:req.session.user
// });
// course.save().then(resul =>{
//   console.log(resul);

//   res.end("course created");
//   console.log("course created in table");


// })
// .catch(err => {
//   console.log(err);
//   res.send("course already exists");
//   console.log("course already exists");

// });







//   con.query('SELECT * FROM courses WHERE course_id = ?',[req.body.course_id], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);


//     }else{
//       // console.log('The solution is: ', results);
//       if(result.length >0){
//             res.send("course already exists");
// console.log("course already exists");
//       }else{


// var sql= "insert into courses (course_id,course_name,course_dept,course_description,course_room,course_capacity,waitlist_capacity,course_term,created_by,space_left) values ?";
// var values= [

// [req.body.course_id,req.body.course_name,req.body.course_dept,req.body.course_description,req.body.course_room,req.body.course_capacity,req.body.waitlist_capacity,req.body.course_term,req.session.user,req.body.course_capacity]
// ];
//   con.query(sql,[values], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);
//       res.send({
//         "code":400,
//         "failed":"error ocurred"
//       })
//     }else{
//       // console.log('The solution is: ', results);
//       if(result){


//           res.end("course created");

//   console.log("course created in table");



//       }else{
//         console.log("some error");
//       }
//     }
//   });


//       }

//     }

// });

// });


//Route to handle Post Request Call
// app.get('/course_list_faculty',function(req,res){

//   console.log("getting data for courses info");


//   Course.find({created_by:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });





// con.query("SELECT * FROM courses WHERE created_by = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });


// });



//Route to handle Post Request Call
// app.get('/in_waitlist/:course_id',function(req,res){
//   console.log("course id is"+ req.params.course_id);


//   Waitlist.find({course_id:req.params.course_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });




// console.log("getting data for waitlist info");

// con.query("SELECT * FROM waitlist WHERE course_id = ?",[req.params.course_id], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });






// app.get('/search', function(req, res){
//   console.log('Inside Product GET');


//   Course.find(function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });




// con.query("SELECT * FROM courses ", function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     // console.log('The solution is: ', results);

//   }
// });
// });

// app.post('/search_post', function(req, res){
//   console.log('Inside Search GET: ', req.body);

// if(req.body.filter=="id")
// {

//   Course.find({course_id:{$regex: "^"+req.body.search}},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });

// }

// if(req.body.filter=="name")
// {

//   Course.find({course_name:{$regex: "^"+req.body.search}},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });

// }
// if(req.body.filter=="greater")
// {

//   Course.find({course_id:{$gt:req.body.search}},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });

// }

// if(req.body.filter=="less")
// {

//   Course.find({course_id:{$lt:req.body.search}},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });

// }

// });



//Route to handle code generation
// app.post('/code',function(req,res){

//   console.log("Inside code generation Request");
//   console.log("Req Body : ",req.body);
//   var code= Math.floor(Math.random() * (20000 - 12000)) + 12000; 
//   console.log("the code is" +code);


//   Waitlist.update({username:req.session.user,course_id:req.body.course_id},{ $set:{permission_code:code} }).exec()
//   .then(result=>{
//     res.send("code given");
//     console.log("data updated");
//     console.log(JSON.stringify(result));
//   })
//   .catch(err => {

//     console.log(err);
//   });




// var sql= "update waitlist set permission_code=? where username=? and course_id=?";

//   con.query(sql,[code,req.body.username,req.body.course_id], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       res.send("code given");
//       console.log("data updated");
//       console.log(JSON.stringify(result));
//       // console.log('The solution is: ', results);

//     }
//   });

// });


//Route to handle Post Request Call
// app.get('/enrolled/:course_id',function(req,res){
//   console.log("course id is"+ req.params.course_id);

//   console.log("getting data for enrolled info");

//   User.find({ courses_enrolled: { $all: [ req.params.course_id] } },function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });






// con.query("SELECT * FROM enrolled WHERE course_id = ?",[req.params.course_id], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });





//Route to handle remove student enrollment
// app.post('/remove',function(req,res){

//   console.log("Inside remove student Request");
//   console.log("Req Body : ",req.body);


//   User.updateOne({username:req.body.username},{ $pull: { courses_enrolled: { $in: [ req.body.course_id] }} },
//   { multi: true }).exec()
//   .then(result=>{
//     console.log("mongo: ",result);
//     console.log("user enrollment is removed");
//     res.send("removed");
//   })
//   .catch(err => {

//     console.log(err);
//   });


// Course.update({course_id:req.body.course_id},{ $inc:{space_left:1} }).exec()
// .then(result=>{
//   console.log("mongo: ",result);
//   console.log("space left is updated");
// })
// .catch(err => {

//   console.log(err);
// });




// var sql= "delete from enrolled where username=? and course_id=?";

//   con.query(sql,[req.body.username,req.body.course_id], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       res.send("user removed");
//       console.log("user removed");
//       console.log(JSON.stringify(result));
//       // console.log('The solution is: ', results);

//     }
//   });
//   con.query("update courses set space_left=space_left+1 where course_id=?",[req.body.course_id], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       console.log("space left is updated");
//       // console.log('The solution is: ', results);

//     }
//   });
// });



//Route to handle Post Request Call
// app.get('/announcements_faculty',function(req,res){

//   console.log("getting data for announcements info");


//   Announcement.find({created_by:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });








// con.query("SELECT * FROM announcements WHERE created_by = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });


// });




//Route to handle Post Request Call
// app.get('/make_announcement/:course_id',function(req,res){
//   console.log("course id is"+ req.params.course_id);


//   console.log("getting data for announcement info");

//   Announcement.find({course_id:req.params.course_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });








// con.query("SELECT * FROM announcements WHERE course_id = ?",[req.params.course_id], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });


//Route to add announcement
// app.post('/make_announcement',function(req,res){

//   console.log("Inside code generation Request");
//   console.log("Req Body : ",req.body);
//   var datetime = new Date();

//   const announcement=new Announcement({

//     _id: new mongoose.Types.ObjectId(),
//     announcement: req.body.announcement,
//     created_by:req.session.user,
//     course_id:req.body.course_id,
//     created_at:datetime

//   });
//   announcement.save().then(resul =>{
//     console.log(resul);
//     console.log("announcement added");
//     console.log(JSON.stringify(resul));
//     res.send("DONE");

//   })
//   .catch(err => {
//     console.log(err);


//   });



// var sql= "insert into announcements (announcement,created_by,course_id,created_at) values ?";
// var values=[

// [req.body.announcement,req.session.user,req.body.course_id,datetime]

// ];
//   con.query(sql,[values], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       res.send("announcement added");
//       console.log("announcement added");
//       console.log(JSON.stringify(result));
//       // console.log('The solution is: ', results);

//     }
//   });

// });


//Route to handle Post Request Call
// app.get('/announcements_student/:course_id',function(req,res){

//   console.log("getting data for student announcements info");
//   console.log("course id is"+ req.params.course_id);


//   Announcement.find({course_id:req.params.course_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });







//   con.query("SELECT * FROM enrolled where username=?", [req.session.user],function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{


//       var number_results= result.length-1;
//       var valid_courses="course_id='";
//       while(number_results>=0)
//       {
//         if(number_results==result.length-1)
//         {
//           valid_courses=result[number_results].course_id
//         }  else{

//         valid_courses=result[number_results].course_id+"' OR course_id='"+valid_courses;
//         }
//         number_results--;
//       }

//       console.log(req.session.user);
//       console.log(req.session.id);
//       // console.log('The solution is: ', results);
//       var sql="SELECT * FROM announcements where course_id='";

//       console.log("SQL query is: "+sql+valid_courses+"'");
// var perform_sql=sql+valid_courses+"'";
//       con.query(perform_sql,function (error, result, fields) {
//         if (error) {
//           if (error) throw error;
//           // console.log("error ocurred",error);

//         }else{
//           res.send(JSON.stringify(result));
//           console.log("data sent");
//           console.log(JSON.stringify(result));
//           console.log(req.session.user);
//           console.log(req.session.id);
//           // console.log('The solution is: ', results);

//         }
//       });

//     }
//   });
// });




//Route to handle code generation
// app.post('/enroll',function(req,res){

//   console.log("Inside enroll course Request");
//   console.log("Req Body : ",req.body);



//   Course.find({course_id:req.body.course_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc[0].course_name);



//       const enroll=new Enrolled({

//         _id: new mongoose.Types.ObjectId(),
//         course_id: req.body.course_id,
//         username:req.session.user,
//         course_name:doc[0].course_name,
//         course_description:doc[0].course_description

//       });
//       enroll.save().then(resul =>{
//         console.log(resul);
//         console.log("enrollment added");
//         console.log(JSON.stringify(resul));

//       })
//       .catch(err => {
//         console.log(err);


//       });




//     }
//   });





//   Course.updateOne({course_id:req.body.course_id},{ $inc:{space_left:-1} }).exec()
//   .then(result=>{
//     console.log("mongo: ",result);
//   console.log("space left is updated");
//   })
//   .catch(err => {

//     console.log(err);
//   });




//   User.updateOne({username:req.session.user},{ $push: { courses_enrolled: req.body.course_id } }).exec()
//   .then(result=>{
//     console.log("mongo: ",result);
//   console.log("courses_enrolled is updated");
//   })
//   .catch(err => {

//     console.log(err);
//   });


//   con.query("select * from enrolled where course_id=? and username=?",[req.body.course_id,req.session.user], function (error1, result1, fields1) {
//     if (error1) {
//       if (error1) throw error1;
//       // console.log("error ocurred",error);

//     }else{

// if(result1.length>0)
// {

// console.log(result1);
//   res.send("already enrolled");
// }else{
//   console.log(result1);

//   con.query("select * from courses where course_id=?",[req.body.course_id], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{

//       console.log("the capacity is: "+result[0].space_left);
//       if(result[0].space_left!=0)
//       {

//         var sql= "insert into enrolled (course_id,course_name,username) values ?";
//         var values=[

//           [req.body.course_id,result[0].course_name,req.session.user]
//         ];
//           con.query(sql,[values], function (error, result, fields) {
//             if (error) {
//               if (error) throw error;
//               // console.log("error ocurred",error);

//             }else{
//               res.send("enrolled");
//               console.log("data updated");
//               console.log(JSON.stringify(result));
//               // console.log('The solution is: ', results);

//             }
//           });

//           con.query("update courses set space_left=space_left-1 where course_id=?",[req.body.course_id], function (error, result, fields) {
//             if (error) {
//               if (error) throw error;
//               // console.log("error ocurred",error);

//             }else{
//               console.log("space left is updated");
//               // console.log('The solution is: ', results);

//             }
//           });

//       }else{

//           console.log("course capacity is full");
//           res.send("course capacity is full");

//       }

//     }

//   });





// }

// }
// });
// });



//Route to handle course_list_student
// app.get('/course_list_student',function(req,res){

//   console.log("getting data for student enrollment info");


//   User.find({username:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc[0].courses_enrolled);
//       res.end(JSON.stringify(doc[0].courses_enrolled))
//     }
//   });




// con.query("SELECT * FROM enrolled WHERE username = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });


//Route to handle recipients
// app.get('/recipients',function(req,res){

//   console.log("getting data for recipients");


//   User.find(function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });

// });



//Route to handle course_list_student
// app.get('/sent_messages',function(req,res){

//   console.log("getting data for sent_messages");


//   Inbox.find({from:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });

// });



//Route to handle course_list_student
// app.get('/inbox',function(req,res){

//   console.log("getting data for inbox");


//   Inbox.find({to:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });

// });



// send a message


// app.post('/send_message',function(req,res){

//   let date = require('date-and-time');
//   let now = new Date();
//   let print_date=date.format(now, 'hh:mm A MMM DD YYYY'); 

//   console.log(print_date);
// const inbox=new Inbox({

//   _id: new mongoose.Types.ObjectId(),
//   to: req.body.to,
//   from:req.session.user,
//   message:req.body.message,
//   date:print_date

// });
// inbox.save().then(resul =>{
//   console.log(resul);
//   console.log("message added");
//   console.log(JSON.stringify(resul));
//   res.send("sent");

// })
// .catch(err => {
//   console.log(err);


// });

// });

// //Route to handle remove student enrollment
// app.post('/remove_course',function(req,res){

//   console.log("Inside remove enrollment Request");
//   console.log("Req Body : ",req.body);




//   User.updateOne({username:req.session.user},{ $pull: { courses_enrolled: { $in: [ req.body.course_id] }, vegetables: "carrots" } },
//   { multi: true }).exec()
//   .then(result=>{
//     console.log("mongo: ",result);
//     console.log("user enrollment is updated");
//     res.send("removed");
//   })
//   .catch(err => {

//     console.log(err);
//   });


//   Course.update({course_id:req.body.course_id},{ $inc:{space_left:1} }).exec()
//   .then(result=>{
//     console.log("mongo: ",result);
//     console.log("space left is updated");
//   })
//   .catch(err => {

//     console.log(err);
//   });






// var sql= "delete from enrolled where username=? and course_id=?";

//   con.query(sql,[req.session.user,req.body.course_id], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       res.send("course removed");
//       console.log("course removed");
//       console.log(JSON.stringify(result));
//       // console.log('The solution is: ', results);

//     }
//   });
//   con.query("update courses set space_left=space_left+1 where course_id=?",[req.body.course_id], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       console.log("space left is updated");
//       // console.log('The solution is: ', results);

//     }
//   });
// });







//Route to handle code generation
// app.post('/waitlist',function(req,res){

//   console.log("Inside waitlist course Request");
//   console.log("Req Body : ",req.body);




//   const waitlist=new Waitlist({

//     _id: new mongoose.Types.ObjectId(),
//     course_id: req.body.course_id,
//     username:req.session.user
//   });
//   waitlist.save().then(resul =>{
//     console.log(resul);
//     res.send("waitlisted");
//     console.log(JSON.stringify(resul));

//   })
//   .catch(err => {
//     console.log(err);


//   });



//   Course.update({course_id:req.body.course_id},{ $set:{in_waitlist:in_waitlist+1} }).exec()
//   .then(result=>{
//     console.log("mongo: ",result);
//     console.log("in waitlist is updated");
//   })
//   .catch(err => {

//     console.log(err);
//   });




//   con.query("select * from waitlist where course_id=? and username=?",[req.body.course_id,req.session.user], function (error1, result1, fields1) {
//     if (error1) {
//       if (error1) throw error1;
//       // console.log("error ocurred",error);

//     }else{

// if(result1.length>0)
// {

// console.log(result1);
//   res.send("already in waitlist");
// }else{
//   console.log(result1);

//   con.query("select * from courses where course_id=?",[req.body.course_id], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{

//       console.log("the space left is: "+result[0].space_left);
//       if(result[0].waitlist_capacity!=result[0].in_waitlist)
//       {

//         var sql= "insert into waitlist (course_id,course_name,username) values ?";
//         var values=[

//           [req.body.course_id,result[0].course_name,req.session.user]
//         ];
//           con.query(sql,[values], function (error, result, fields) {
//             if (error) {
//               if (error) throw error;
//               // console.log("error ocurred",error);

//             }else{
//               res.send("waitlisted");
//               console.log("data updated");
//               console.log(JSON.stringify(result));
//               // console.log('The solution is: ', results);

//             }
//           });

//           con.query("update courses set in_waitlist=in_waitlist+1 where course_id=?",[req.body.course_id], function (error, result, fields) {
//             if (error) {
//               if (error) throw error;
//               // console.log("error ocurred",error);

//             }else{
//               console.log("In waitlist is updated");
//               // console.log('The solution is: ', results);

//             }
//           });

//       }else{

//         res.send("waitlist is full");
//       }

//     }

//   });
// }

// }
// });
// });





//Route to handle Post Request Call
// app.get('/all_enrolled/:course_id',function(req,res){
//   console.log("course id is"+ req.params.course_id);


//   console.log("getting data for all enrolled info");



//   User.find({ courses_enrolled: { $all: [ req.params.course_id] } },function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });





// con.query("SELECT * FROM enrolled WHERE course_id = ?",[req.params.course_id], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });



//Route to handle course_list_student
// app.get('/courses',function(req,res){

//   console.log("getting data for courses info");


//   User.find({username:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc[0].courses_enrolled);
//       res.end(JSON.stringify(doc[0].courses_enrolled));
//     }
//   });




// con.query("SELECT * FROM courses join enrolled on courses.course_id=enrolled.course_id WHERE username = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });



// app.post('/update_enrolled',function(req,res){

//   console.log("updating enrolled data");

//   User.update({username:req.session.user},{ $set:{courses_enrolled:req.body.courses} }).exec()
//   .then(result=>{
//     console.log("mongo: ",result);
//     console.log("in waitlist is updated");
//     res.send("updated");
//   })
//   .catch(err => {

//     console.log(err);
//   });



// });


//Route to handle course_list_student
// app.get('/quiz',function(req,res){

//   console.log("getting data for quiz info");



//   Quiz.find({created_by:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });



// con.query("SELECT * FROM quiz WHERE created_by = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });

//Route to handle course_list_student
// app.get('/create_quiz',function(req,res){

//   console.log("getting data for quiz courses info");


//   Course.find({created_by:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });




// con.query("SELECT * FROM courses WHERE created_by = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });




//Route to handle remove student enrollment
// app.post('/create_quiz',function(req,res){

//   console.log("Inside create quiz Request");
//   console.log("Req Body : ",req.body);




//   const quiz=new Quiz({

//     _id: new mongoose.Types.ObjectId(),
//     quiz_name: req.body.quiz_name,
//     created_by:req.session.user,
//     course_id:req.body.course_id,
//     publish:"no"

//   });
//   quiz.save().then(resul =>{
//     res.send("Quiz is created");
//     console.log("Quiz is created");

//   })
//   .catch(err => {
//     console.log(err);


//   });


//   con.query("select * from quiz where quiz_name=? and course_id=?",[req.body.quiz_name,req.body.course_id], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       if(result.length>0)
//       {

// res.send("Quiz name already exists");
//       }else{

//         var values=[
//           [req.body.quiz_name,req.body.course_id,req.session.user,"no"]
//         ];
//         con.query("insert into quiz (quiz_name,course_id,created_by,publish) values?",[values], function (error, result, fields) {
//           if (error) {
//             if (error) throw error;
//             // console.log("error ocurred",error);

//           }else{
//             res.send("Quiz is created");
//             console.log("Quiz is created");
//             // console.log('The solution is: ', results);

//           }
//         });


//       }


//     }
//   });

// });




//Route to handle course_list_student
// app.post('/publish_quiz',function(req,res){

//   console.log("inside the publish quiz request");
// console.log(req.body);



// Quiz.update({_id:req.body.quiz_id},{ $set:{publish:"yes"} }).exec()
// .then(result=>{
//   console.log("mongo: ",result);
//   res.send("quiz is published");
//   console.log("quiz published");
// })
// .catch(err => {

//   console.log(err);
// });

// con.query("update quiz set publish='yes' WHERE quiz_id= ?",[req.body.quiz_id], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send("quiz is published");
//     console.log("quiz published");
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });

//Route to handle Post Request Call
// app.get('/quiz_questions/:quiz_id',function(req,res){
//   console.log("quiz id is"+ req.params.quiz_id);


//   console.log("getting data for quiz questions info");



//   Questions.find({quiz_id:req.params.quiz_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });

// con.query("SELECT * FROM questions WHERE quiz_id = ?",[req.params.quiz_id], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });


//Route to handle course_list_student
// app.post('/add_question',function(req,res){

//   console.log("inside the add question request");
// console.log(req.body);





// const question=new Questions({

//   _id: new mongoose.Types.ObjectId(),
//   quiz_id: req.body.quiz_id,
//   question_name:req.body.question_name,
//   option_a:req.body.option_a,
//   option_b:req.body.option_b,
//   option_c:req.body.option_c,
//   option_d:req.body.option_d,
//   correct_answer:req.body.correct_answer,

// });
// question.save().then(resul =>{
//   console.log(resul);
//   res.send("question inserted");
//       console.log("question inserted");

// })
// .catch(err => {
//   console.log(err);


// });


// var values=[
//   [req.body.quiz_id,req.body.question_name,req.body.option_a,req.body.option_b,req.body.option_c,req.body.option_d,req.body.correct_answer]
// ];
//   con.query("insert into questions (quiz_id,question_name,option_a,option_b,option_c,option_d,correct_answer) values?",[values], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       res.send("question inserted");
//       console.log("question inserted");
//       console.log(req.session.user);
//       console.log(req.session.id);
//       // console.log('The solution is: ', results);

//     }
//   });
// });


//Route to handle course_list_student
// app.get('/quiz_list/:course_id',function(req,res){

//   console.log("getting data for quiz list info");
//   console.log("course id is"+ req.params.course_id);


//   Quiz.find({course_id:req.params.course_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });





// con.query("SELECT * FROM quiz join enrolled on quiz.course_id=enrolled.course_id WHERE username = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });

//Route to handle Post Request Call
// app.get('/take_quiz/:quiz_id',function(req,res){
//   console.log("quiz id is"+ req.params.quiz_id);


//   console.log("getting data for take quiz info");



//   Questions.find({quiz_id:req.params.quiz_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });




// con.query("SELECT * FROM questions WHERE quiz_id = ?",[req.params.quiz_id], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });


// app.post('/dp', upload.single('dp'), function (req, res, next) {
//   console.log("inside upload");
//   console.log(req.body.image_name);

//   User.update({username:req.session.user},{ $set:{profile_image:req.body.image_name} }).exec()
//   .then(result=>{
//           console.log("mongo: ",result);
//           console.log("uploaded");

//                   User.find({username:req.session.user},function(err,doc){

//                     if(doc)
//                     {
//                       console.log("doc found");
//                       console.log(doc);
//                       res.end(JSON.stringify(doc))
//                     }
//                   });




//   })
//   .catch(err => {

//     console.log(err);
//   });


// })


//Route to handle files info
// app.get('/files_faculty',function(req,res){

//   console.log("getting data for files info");



//   File.find({created_by:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });




// con.query("SELECT * FROM files WHERE created_by = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });




// app.post('/upload_file', upload.single('myfile'), function (req, res, next) {
//   console.log("inside upload file");
//   console.log(req.body.file_name);



//   const file=new File({

//     _id: new mongoose.Types.ObjectId(),
//     file_name: req.body.file_name,
//     created_by:req.session.user,
//     course_id:req.body.course_id

//   });
//   file.save().then(resul =>{
//     console.log(resul);
//     res.send("file uploaded");
//       console.log("file uploaded");

//   })
//   .catch(err => {
//     console.log(err);


//   });


//   var sql= "insert into files (file_name,course_id,created_by) values?";
// var values=[
//   [req.body.file_name,req.body.course_id,req.session.user]
// ];
//   con.query(sql,[values], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       res.send("file uploaded");
//       console.log("file uploaded");
//       console.log(JSON.stringify(result));
//       // console.log('The solution is: ', results);

//     }
//   });

// })

//Route to handle course_list_student
// app.get('/upload_file',function(req,res){

//   console.log("getting data for upload file courses info");




//   Course.find({created_by:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });


// con.query("SELECT * FROM courses WHERE created_by = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });



//Route to handle files info
// app.get('/assignments_faculty',function(req,res){

//   console.log("getting data for assignments info");



//   Assignment.find({created_by:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });


// con.query("SELECT * FROM assignments WHERE created_by = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });




//Route to handle create_assignment
// app.post('/create_assignment',function(req,res){

//   console.log("inside the add assignment request");
// console.log(req.body);



// const assignment=new Assignment({

//   _id: new mongoose.Types.ObjectId(),
//   assignment_name: req.body.assignment_name,
//   assignment_requirements:req.body.assignment_requirements,
//   course_id:req.body.course_id,
//   assignment_duedate:req.body.assignment_duedate,
//   assignment_points:req.body.assignment_points,
//   created_by:req.session.user

// });
// assignment.save().then(resul =>{
//   console.log(resul);
//   res.send("assignment created");
//   console.log("assignment inserted");

// })
// .catch(err => {
//   console.log(err);


// });



// var values=[
//   [req.body.course_id,req.body.assignment_name,req.body.assignment_requirements,req.body.assignment_duedate,req.body.assignment_points,req.session.user]
// ];
//   con.query("insert into assignments (course_id,assignment_name,assignment_requirements,assignment_duedate,assignment_points,created_by) values?",[values], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       res.send("assignment created");
//       console.log("assignment inserted");
//       console.log(req.session.user);
//       console.log(req.session.id);
//       // console.log('The solution is: ', results);

//     }
//   });
// });


//Route to handle course_list_student
// app.get('/assignments_student/:course_id',function(req,res){
//   console.log("course id is"+ req.params.course_id);
//   console.log("getting data for student assignment list info");




//   Assignment.find({course_id:req.params.course_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });



// con.query("SELECT * FROM assignments join enrolled on assignments.course_id=enrolled.course_id WHERE username = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });

//Route to handle Post Request Call
// app.get('/show_assignment_faculty/:assignment_id',function(req,res){
//   console.log("assignment id is"+ req.params.assignment_id);


//   console.log("getting data for show assignment info");



//   Assignment.find({_id:req.params.assignment_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });





// con.query("SELECT * FROM assignments WHERE assignment_id = ?",[req.params.assignment_id], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });


//Route to handle show submissions
// app.get('/show_submissions/:assignment_id',function(req,res){
//   console.log("assignment id is"+ req.params.assignment_id);


//   console.log("getting data for show submissions info");


//   Submission.find({assignment_id:req.params.assignment_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });




// con.query("SELECT * FROM submissions WHERE assignment_id = ?",[req.params.assignment_id], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });




//Route to handle grade assignment
// app.post('/grade_assignment',function(req,res){

//   console.log("inside the grade assignment request");
// console.log(req.body);



// Submission.update({_id:req.body.submission_id},{ $set:{graded:req.body.grade} }).exec()
// .then(result=>{
//   console.log("mongo: ",result);
//   res.send("assignment graded");
//   console.log("assignment graded");
// })
// .catch(err => {

//   console.log(err);
// });



// con.query("update submissions set graded=? WHERE submission_id= ?",[req.body.grade,req.body.submission_id], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send("assignment graded");
//     console.log("assignment graded");
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });




// app.post('/submit_assignment', upload.single('myfile'), function (req, res, next) {
//   console.log("inside submit assignment");
//   console.log(req.body);




//  const submission=new Submission({

//   _id: new mongoose.Types.ObjectId(),
//   file_name: req.body.file_name,
//   assignment_id:req.body.assignment_id,
//   assignment_name:req.body.assignment_name,
//   course_id:req.body.course_id,
//   submitted_by:req.session.user,
//   graded:"no"

// });
// submission.save().then(resul =>{
//   res.send("file uploaded");
//   console.log(resul);
//   console.log("submission added");

// })
// .catch(err => {
//   console.log(err);


// });

//   var sql= "insert into submissions (file_name,assignment_id,submitted_by) values?";
// var values=[
//   [req.body.file_name,req.body.assignment_id,req.session.user]
// ];
//   con.query(sql,[values], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       res.send("file uploaded");
//       console.log("file uploaded");
//       console.log(JSON.stringify(result));
//       // console.log('The solution is: ', results);

//     }
//   });

// })



//Route to handle show submissions
// app.get('/previous_submissions/:assignment_id',function(req,res){
//   console.log("assignment id is"+ req.params.assignment_id);


//   console.log("getting data for previous submissions info");



//   Submission.find({assignment_id:req.params.assignment_id,submitted_by:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });




// con.query("SELECT * FROM submissions WHERE assignment_id=? and submitted_by=?",[req.params.assignment_id,req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });

//Route to handle course_list_student
// app.get('/show_waitlist',function(req,res){

//   console.log("getting data for student waitlist info");




//   Waitlist.find({username:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });



// con.query("SELECT * FROM waitlist WHERE username = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });




//Route to handle take_test
// app.post('/take_test',function(req,res){

//   console.log("inside the take_test request");
// console.log(req.body);

// const scores=new Scores({

//   _id: new mongoose.Types.ObjectId(),
//   quiz_id: req.body.quiz_id,
//   taken_by:req.session.user,
//   score:req.body.score

// });
// scores.save().then(resul =>{
//   console.log(resul);
//   res.send("score created");
//   console.log("score inserted");

// })
// .catch(err => {
//   console.log(err);


// });


// var values=[
//   [req.body.quiz_id,req.body.score,req.session.user]
// ];
//   con.query("insert into scores (quiz_id,score,taken_by) values?",[values], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       res.send("assignment created");
//       console.log("assignment inserted");
//       console.log(req.session.user);
//       console.log(req.session.id);
//       // console.log('The solution is: ', results);

//     }
//   });
// });

//Route to handle remove student enrollment
// app.post('/apply_code',function(req,res){

//   console.log("Inside apply code Request");
//   console.log("Req Body : ",req.body);


//   Waitlist.remove({username:req.body.username,course_id:req.body.course_id}).exec()
//   .then(result=>{
//     console.log(result);
//     res.send("waitlist removed");
//     console.log("waitlist removed");
//   })
//   .catch(err=>{
//   console.log(err);
//   });




//   const enroll=new Enrolled({

//     _id: new mongoose.Types.ObjectId(),
//     course_id: req.body.course_id,
//     username:req.session.user

//   });
//   enroll.save().then(resul =>{
//     console.log(resul);
//     console.log("student enrolled");

//   })
//   .catch(err => {
//     console.log(err);


//   });




// var sql= "delete from waitlist where username=? and course_id=?";

//   con.query(sql,[req.session.user,req.body.course_id], function (error, result, fields) {
//     if (error) {
//       if (error) throw error;
//       // console.log("error ocurred",error);

//     }else{
//       res.send("waitlist removed");
//       console.log("waitlist removed");
//       console.log(JSON.stringify(result));
//       // console.log('The solution is: ', results);

//     }
//   });

//   con.query("select * from courses where course_id=?",[req.body.course_id], function (error1, result1, fields1) {


//     var sql= "insert into enrolled (course_id,course_name,username) values ?";
//     var values=[

//       [req.body.course_id,result1[0].course_name,req.session.user]
//     ];

//     con.query(sql,[values], function (error, result, fields) {
//       if (error) {
//         if (error) throw error;
//         // console.log("error ocurred",error);

//       }else{
//         console.log("student enrolled");
//         // console.log('The solution is: ', results);

//       }
//     });



//   });

// });


//Route to handle grades
// app.get('/grades/:course_id',function(req,res){

//   console.log("getting data for grades info");



//   Submission.find({course_id:req.params.course_id,submitted_by:req.session.user},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });




// con.query("SELECT * FROM submissions join assignments on assignments.assignment_id=submissions.assignment_id WHERE submitted_by = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });


//Route to handle files info
// app.get('/files_student/:course_id',function(req,res){

//   console.log("getting data for files info");




//   File.find({course_id:req.params.course_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });







// con.query("SELECT * FROM files join enrolled on files.course_id=enrolled.course_id WHERE username = ?",[req.session.user], function (error, result, fields) {
//   if (error) {
//     if (error) throw error;
//     // console.log("error ocurred",error);

//   }else{
//     res.send(JSON.stringify(result));
//     console.log("data sent");
//     console.log(JSON.stringify(result));
//     console.log(req.session.user);
//     console.log(req.session.id);
//     // console.log('The solution is: ', results);

//   }
// });
// });


//Route to handle grades
// app.get('/show_course/:course_id',function(req,res){

//   console.log("getting data for courses info");



//   Course.find({course_id:req.params.course_id},function(err,doc){

//     if(doc)
//     {
//       console.log("doc found");
//       console.log(doc);
//       res.end(JSON.stringify(doc))
//     }
//   });
// });


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;



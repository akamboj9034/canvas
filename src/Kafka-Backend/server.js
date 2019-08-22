var connection = require('./kafka/connection');

var account = require('./services/account');
var updateAccount = require('./services/updateAccount');
var addQuestion = require('./services/add_question');
var allEnrolled = require('./services/all_enrolled');
var announcementsFaculty = require('./services/announcements_faculty');
var announcementsStudent = require('./services/announcements_student');
var applyCode = require('./services/apply_code');
var assignmentsFaculty = require('./services/assignments_faculty');
var assignmentsStudent = require('./services/assignments_student');
var code = require('./services/code');
var courseListFaculty = require('./services/course_list_faculty');
var courseListStudent = require('./services/course_list_student');
var courses = require('./services/courses');
var createAssignment = require('./services/create_assignment');
var createCourse = require('./services/create_course');
var createQuizPost = require('./services/create_quiz_post');
var createQuiz = require('./services/create_quiz');
var enroll = require('./services/enroll');
var enrolled = require('./services/enrolled');
var filesFaculty = require('./services/files_faculty');
var filesStudent = require('./services/files_student');
var gradeAssignment = require('./services/grade_assignment');
var grades = require('./services/grades');
var inWaitlist = require('./services/in_waitlist');
var inbox = require('./services/inbox');
var makeAnnouncementPost = require('./services/make_announcement_post');
var makeAnnouncement = require('./services/make_announcement');
var previousSubmissions = require('./services/previous_submissions');
var publishQuiz = require('./services/publish_quiz');
var quizList = require('./services/quiz_list');
var quizQuestions = require('./services/quiz_questions');
var quiz = require('./services/quiz');
var recipients = require('./services/recipients');
var removeCourse = require('./services/remove_course');
var remove = require('./services/remove');
var search = require('./services/search');
var sendMessage = require('./services/send_message');
var sentMessages = require('./services/sent_messages');
var showAssignmentFaculty = require('./services/show_assignment_faculty');
var showCourse = require('./services/show_course');
var showSubmissions = require('./services/show_submissions');
var showWaitlist = require('./services/show_waitlist');
var takeQuiz = require('./services/take_quiz');
var takeTest = require('./services/take_test');
var updateEnrolled = require('./services/update_enrolled');
var waitlist = require('./services/waitlist');
var searchPost = require('./services/search_post');
var login = require('./services/login');





function handleTopicRequest(topic_name, function_name){

    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();

    console.log('server is running');
    consumer.on('message', function(message){
        console.log('message recieved for ' + topic_name + " " + function_name);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        function_name.handle_request(data.data, function(err, res){
            console.log('After request handling: ', res);
            var payload = [{
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId : data.correlationId,
                    data : res
                }),
                partition: 0
            }];

            producer.send(payload, function(err, data){
                console.log('Data: ', data);
            });
            return;

        });
    });
}


handleTopicRequest("accountInfo", account);
handleTopicRequest("updateAccountInfo", updateAccount);
handleTopicRequest("addQuestion", addQuestion);
handleTopicRequest("allEnrolled", allEnrolled);
handleTopicRequest("announcementsFaculty", announcementsFaculty);
handleTopicRequest("announcementsStudent", announcementsStudent);
handleTopicRequest("applyCode", applyCode);
handleTopicRequest("assignmentsFaculty", assignmentsFaculty);
handleTopicRequest("assignmentsStudent", assignmentsStudent);
handleTopicRequest("code", code);
handleTopicRequest("courseListFaculty", courseListFaculty);
handleTopicRequest("courseListStudent", courseListStudent);
handleTopicRequest("courses", courses);
handleTopicRequest("createAssignment", createAssignment);
handleTopicRequest("createCourse", createCourse);
handleTopicRequest("createQuizPost", createQuizPost);
handleTopicRequest("createQuiz", createQuiz);
handleTopicRequest("enroll", enroll);
handleTopicRequest("enrolled", enrolled);
handleTopicRequest("filesFaculty", filesFaculty);
handleTopicRequest("filesStudent", filesStudent);
handleTopicRequest("gradeAssignment", gradeAssignment);
handleTopicRequest("grades", grades);
handleTopicRequest("inWaitlist", inWaitlist);
handleTopicRequest("inbox", inbox);
handleTopicRequest("makeAnnouncementPost", makeAnnouncementPost);
handleTopicRequest("makeAnnouncement", makeAnnouncement);
handleTopicRequest("previousSubmissions", previousSubmissions);
handleTopicRequest("publishQuiz", publishQuiz);
handleTopicRequest("quizList", quizList);
handleTopicRequest("quizQuestions", quizQuestions);
handleTopicRequest("quiz", quiz);
handleTopicRequest("recipients", recipients);
handleTopicRequest("removeCourse", removeCourse);
handleTopicRequest("remove", remove);
handleTopicRequest("search", search);
handleTopicRequest("sendMessage", sendMessage);
handleTopicRequest("sentMessages", sentMessages);
handleTopicRequest("showAssignmentFaculty", showAssignmentFaculty);
handleTopicRequest("showCourse", showCourse);
handleTopicRequest("showSubmissions", showSubmissions);
handleTopicRequest("showWaitlist", showWaitlist);
handleTopicRequest("takeQuiz", takeQuiz);
handleTopicRequest("takeTest", takeTest);
handleTopicRequest("updateEnrolled", updateEnrolled);
handleTopicRequest("waitlist", waitlist);
handleTopicRequest("searchPost", searchPost);
handleTopicRequest("login", login);
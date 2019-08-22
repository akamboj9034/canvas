
const mongoose = require('mongoose');

const submissions_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    file_name: String,
    assignment_id: String,
    assignment_name: String,
    submitted_by: String,
    graded: String,
    course_id: String


});

module.exports = mongoose.model('Submissions_model', submissions_schema);
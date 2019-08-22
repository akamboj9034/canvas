
const mongoose = require('mongoose');

const quiz_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    quiz_name: String,
    course_id: String,
    created_by: String,
    publish: String


});

module.exports = mongoose.model('Quiz_model', quiz_schema);
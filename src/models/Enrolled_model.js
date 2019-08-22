
const mongoose = require('mongoose');

const enrolled_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    course_id: String,
    course_name: String,
    username: String,
    course_name: String,
    course_description: String


});

module.exports = mongoose.model('Enrolled_model', enrolled_schema);
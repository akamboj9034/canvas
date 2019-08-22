
var uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');

const courses_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    course_id: { type: String, unique: true },
    course_name: String,
    course_description: String,
    course_dept: String,
    course_room: String,
    course_capacity: Number,
    waitlist_capacity: Number,
    course_term: String,
    space_left: Number,
    in_waitlist: Number,
    created_by: String

});
courses_schema.plugin(uniqueValidator);
module.exports = mongoose.model('Courses_model', courses_schema);
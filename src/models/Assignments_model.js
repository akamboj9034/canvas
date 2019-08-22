
const mongoose = require('mongoose');

const assignments_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    assignment_name: String,
    course_id: String,
    assignment_requirements: String,
    assignment_duedate: String,
    assignment_points: String,
    created_by: String


});

module.exports = mongoose.model('Assignments_model', assignments_schema);
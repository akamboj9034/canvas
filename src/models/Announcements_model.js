
const mongoose = require('mongoose');

const announcements_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    announcement: String,
    course_id: String,
    created_by: String,
    created_at: String


});

module.exports = mongoose.model('Announcements_model', announcements_schema);
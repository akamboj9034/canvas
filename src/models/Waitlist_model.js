
const mongoose = require('mongoose');

const waitlist_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    course_id: String,
    username: String,
    permission_code: Number,
    course_name: String


});

module.exports = mongoose.model('Waitlist_model', waitlist_schema);
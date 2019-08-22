
const mongoose = require('mongoose');

const files_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    file_name: String,
    course_id: String,
    created_by: String


});

module.exports = mongoose.model('Files_model', files_schema);
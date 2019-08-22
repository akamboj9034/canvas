
const mongoose = require('mongoose');

const questions_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    quiz_id: String,
    question_name: String,
    option_a: String,
    option_b: String,
    option_c: String,
    option_d: String,
    correct_answer: String



});

module.exports = mongoose.model('Questions_model', questions_schema);
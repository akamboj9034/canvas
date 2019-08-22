
const mongoose = require('mongoose');

const scores_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    quiz_id: String,
    score: String,
    taken_by: String


});

module.exports = mongoose.model('Scores_model', scores_schema);

const mongoose = require('mongoose');

const inbox_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    from: String,
    to: String,
    message: String,
    date: String


});

module.exports = mongoose.model('Inbox_model', inbox_schema);
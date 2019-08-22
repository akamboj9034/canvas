
var uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');

const user_schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, unique: true },
    password: String,
    user_type: String,
    email: String,
    phone: String,
    about_me: String,
    city: String,
    country: String,
    company: String,
    school: String,
    hometown: String,
    languages: String,
    gender: String,
    profile_image: String,
    courses_enrolled: Array


});
user_schema.plugin(uniqueValidator);
module.exports = mongoose.model('Signup_model', user_schema);
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    }
}, { collection: "users" });

module.exports = mongoose.model('User', userSchema);
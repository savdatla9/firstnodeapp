const mongoose = require('mongoose');

const arDataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    files: {
        type: Array,
        required: true
    }, 
}, { collection: "ar" });

module.exports = mongoose.model('ARData', arDataSchema);
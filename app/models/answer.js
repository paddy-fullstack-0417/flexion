const mongoose = require('mongoose');

// Define the answer schema
const answerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    answer: [{
        inputNumericalValue: {
            type: String,
            required: true
        },
        inputUnitOfMeasure: {
            type: String,
            required: true
        },
        targetUnitOfMeasure: {
            type: String,
            required: true
        },
        studentResponse: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        }
    }]
});

// Create and export the answer model
module.exports = mongoose.model('answers', answerSchema);
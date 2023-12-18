const mongoose = require('mongoose');

// Define the problem schema
const problemSchema = new mongoose.Schema({
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
});

// Create and export the problem model
module.exports = mongoose.model('problems', problemSchema);
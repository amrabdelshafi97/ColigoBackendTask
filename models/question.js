const mongoose = require('mongoose');
const MongoSchema = mongoose.Schema;

// Create Question Schema
const QuestionSchema = new MongoSchema({
    body: String,
    category: {
        required: true,
        type: String,
        enum: ['single', 'multiple', 'text']
    },
    date: {
        type: Date,
        default: Date.now
    },
    answers: [String],
    correctAnswer: [String]
});

module.exports = mongoose.model('Question', QuestionSchema);
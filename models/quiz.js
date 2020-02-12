const mongoose = require('mongoose');
const MongoSchema = mongoose.Schema;

// Create Quiz Schema
const QuizSchema = new MongoSchema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    topic: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    questions: [{
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
        asnwers: [String],
        correctAnswer: [String]
    }]
});

module.exports = mongoose.model('Quiz', QuizSchema);
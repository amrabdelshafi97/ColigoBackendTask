const Joi = require('@hapi/joi');
const debug = require('debug')('app:quiz-validator');
const questionValidationSchema = require('./question').schema;

//Joi Quiz validation
const quizValidationSchema = Joi.object({
    id: Joi.string().required(),
    topic: Joi.string().required(),
    date: Joi.date(),
    questions: Joi.array().items(questionValidationSchema).min(1).required()
});

module.exports = function validate(quiz) {
    const res = quizValidationSchema.validate(quiz);
    return res;
};
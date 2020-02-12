const Joi = require('@hapi/joi');
const debug = require('debug')('app:question-validator.js');

//Joi Question validation
const questionValidationSchema = Joi.object({
    body: Joi.string().required(),
    category: Joi.string().valid('single', 'multiple', 'text').required(),
    date: Joi.date(),
    answers: Joi.array().items(Joi.string()).min(2).required(),
    correctAnswer: Joi.array().items(Joi.string()).min(1).required()
});

module.exports = {
    schema: questionValidationSchema, //for embedding it into quiz Validation 
    validator: function validate(question) { // for questions route
        const res = questionValidationSchema.validate(question);
        // if (category !== 'multiple' && (question.correctAnswer.length > 1))
        //     return 'notvalid';
        return res;
    }
};
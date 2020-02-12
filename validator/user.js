const Joi = require('@hapi/joi');
const debug = require('debug')('app:user-validator');


//Joi Quiz validation
const userValidationSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required()
});

module.exports = function validate(user) {
    const res = userValidationSchema.validate(user);
    return res;
};
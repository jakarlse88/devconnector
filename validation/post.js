const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    // Hold any errors encountered in validation
    let errors = {};

    // Validator will throw an error if passed anything
    // (ie. an empty argument), so pre-validate and 
    // default to an empty string
    data.text = !isEmpty(data.text) ? data.text : '';

    // Validate login inputs
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    if (!Validator.isLength(data.text, {
            min: 10,
            max: 300
        })) {
        errors.text = 'Post must be between 10-300 characters';
    }

    // Return the errors object along with a flag 
    // indicating whether the request passed validation
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
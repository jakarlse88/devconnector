const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    // Hold any errors encountered in validation
    let errors = {};

    // Validator will throw an error if passed anything
    // (ie. an empty argument), so pre-validate and 
    // default to an empty string
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Validate login inputs
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    // Return the errors object along with a flag 
    // indicating whether the request passed validation
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
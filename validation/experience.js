const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    // Hold any errors encountered in validation
    let errors = {};

    // Validator will throw an error if passed anything
    // (ie. an empty argument), so pre-validate and 
    // default to an empty string
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }

    // Return the errors object along with a flag 
    // indicating whether the request passed validation
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
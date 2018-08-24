import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
    error,
    info,
    name,
    onChange,
    placeholder,
    value
}) => {
    return (
        <div className="form-group">
            <textarea
                // Conditional class application
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {// Conditional error message display
            error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextAreaFieldGroup.propTypes = {
    error: PropTypes.string,
    info: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired
};

export default TextAreaFieldGroup;

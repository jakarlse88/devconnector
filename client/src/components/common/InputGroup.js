import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
    error,
    icon,
    name,
    onChange,
    placeholder,
    type = 'text',
    value
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-ext">
                    <i className={icon} />
                </span>
            </div>
            <input
                // Conditional class application
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
            />
            {// Conditional error message display
            error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

InputGroup.propTypes = {
    error: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired
};

export default InputGroup;

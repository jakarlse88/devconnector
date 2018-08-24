import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({ error, info, name, onChange, options, value }) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));

    return (
        <div className="form-group">
            <select
                // Conditional class application
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                name={name}
                onChange={onChange}
                value={value}>
                {selectOptions}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            {// Conditional error message display
            error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectListGroup.propTypes = {
    error: PropTypes.string,
    info: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired
};

export default SelectListGroup;

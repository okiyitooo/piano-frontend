import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
    render() {
        const { label, type, value, onChange, required, options } = this.props;
        if (type === 'select') {
            return (
                <div className="input-field">
                    <label>{label}</label>
                    <select value={value} onChange={onChange} required={required}>
                        <option value="" disabled>Select {label}</option>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            );
        }
        return (
            <div className="input-field">
                <label>{label}</label>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            </div>
        );
    }
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
};

Input.defaultProps = {
    required: false
};

export default Input;
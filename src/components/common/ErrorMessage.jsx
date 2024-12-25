import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorMessage extends Component {
    render() {
        const { message } = this.props;
        return (
            <div className="error-message" style={{ color: 'red' }}>
                {message}
            </div>
        );
    }
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorMessage;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
class ErrorMessage extends Component {
    render() {
        const { message, onRetry } = this.props;
        return (
            <div  className="alert alert-danger" role="alert">
                {message}
                {onRetry && <button className="btn btn-danger" onClick={onRetry}>Retry</button>}
            </div>
        );
    }
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorMessage;
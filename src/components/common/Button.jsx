import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, type, onClick }) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    type: 'button',
    onClick: () => {},
};

export default Button;
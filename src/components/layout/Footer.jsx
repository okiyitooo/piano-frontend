import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {

    return (
        <footer className="footer bg-dark text-white py-3">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} Piano Shop. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
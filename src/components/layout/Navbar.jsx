import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LogoutButton from '../auth/LogoutButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
    const { isLoggedIn } = useAuth(); // use destrured user later
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/pianos" className="nav-link">Pianos</Link>
                </li>
                {isLoggedIn && (
                    <>
                        <li className="nav-item">
                            <Link to="/user" className="nav-link">My Profile</Link>
                        </li>
                        <li className="nav-item">
                            <LogoutButton />
                        </li>
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default NavBar;
import { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, signup } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setLoggedIn(true);
        }
    }, []);
    const authLogin = async (credentials) => {
        try {
            const response = await login(credentials)
            const user = response.data ;
            setUser(user);
            setLoggedIn(true);
            console.log(response)
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/pianos');
            return response;
        } catch (error) {
            setLoggedIn(false);
            throw error;
        }
    }
    const authSignup = async (credentials) => {
        try {
            const response = await signup(credentials)
            console.log("response",response)
            const user = response.data;
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            setLoggedIn(true);
            localStorage.setItem('token', user.id);
            navigate('/pianos');
            return response;
        } catch (error) {
            setLoggedIn(false);
            throw error;
        }
    }
    const authLogout = async () => {
        try {
            await logout();
            setUser(null);
            setLoggedIn(false);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            throw error;
        }
    }
    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login: authLogin, signup: authSignup, logout: authLogout }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
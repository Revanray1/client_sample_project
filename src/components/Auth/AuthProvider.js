import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('authToken'));

    const login = (token) => {
        const expiryTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('expiryTime', expiryTime);
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('expiryTime');
        setIsAuthenticated(false);
    };

    const checkAuth = () => {
        const token = sessionStorage.getItem('authToken');
        const expiryTime = sessionStorage.getItem('expiryTime');

        if (token && expiryTime > new Date().getTime()) {
            setIsAuthenticated(true);
        } else {
            console.log('Authentication failed');
            setIsAuthenticated(false);
            logout(); // Clear auth if expired
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

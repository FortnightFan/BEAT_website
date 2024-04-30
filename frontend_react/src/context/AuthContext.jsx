import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 > Date.now()) {
                setAuthData(decoded);
            } else {
                localStorage.removeItem('token');  // Token expired
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setAuthData(decoded);
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthData(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, authData, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
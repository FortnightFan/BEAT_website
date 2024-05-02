import { jwtDecode } from 'jwt-decode'; // Corrected import
import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded);  // Set user if the token is valid
                    setUser(decoded);
                } else {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
                //console.log("Failed to decode token:", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } catch (error) {
            //console.log("Failed to decode token on login:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

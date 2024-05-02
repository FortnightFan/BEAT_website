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
<<<<<<< HEAD
                    setUser(decoded);
                } else {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
                //console.log("Failed to decode token:", error);
                localStorage.removeItem('token');
                setUser(null);
=======
                    setUser(decoded);  // Set user if the token is valid
                } else {
                    localStorage.removeItem('token');  // Remove token if expired
                    setUser(null);  // Reset user
                }
            } catch (error) {
                console.log("Failed to decode token:", error);
                localStorage.removeItem('token');  // Remove invalid token
                setUser(null);  // Reset user
>>>>>>> main
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        try {
            const decoded = jwtDecode(token);
<<<<<<< HEAD
            setUser(decoded);
        } catch (error) {
            //console.log("Failed to decode token on login:", error);
=======
            setUser(decoded);  // Set user on successful login
        } catch (error) {
            console.log("Failed to decode token on login:", error);
>>>>>>> main
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
<<<<<<< HEAD
        setUser(null);
=======
        setUser(null);  // Reset user on logout
>>>>>>> main
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

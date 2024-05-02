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
=======
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
>>>>>>> 0b0ff257f394eda08390295a991f148a1d690cc9
                } else {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
<<<<<<< HEAD
                //console.log("Failed to decode token:", error);
                localStorage.removeItem('token');
                setUser(null);
=======
                console.log("Failed to decode token:", error);
                localStorage.removeItem('token');  // Remove invalid token
                setUser(null);  // Reset user
>>>>>>> main
>>>>>>> 0b0ff257f394eda08390295a991f148a1d690cc9
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
<<<<<<< HEAD
            setUser(decoded);
        } catch (error) {
            //console.log("Failed to decode token on login:", error);
=======
            setUser(decoded);  // Set user on successful login
        } catch (error) {
            console.log("Failed to decode token on login:", error);
>>>>>>> main
>>>>>>> 0b0ff257f394eda08390295a991f148a1d690cc9
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
<<<<<<< HEAD
        setUser(null);
=======
<<<<<<< HEAD
        setUser(null);
=======
        setUser(null);  // Reset user on logout
>>>>>>> main
>>>>>>> 0b0ff257f394eda08390295a991f148a1d690cc9
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

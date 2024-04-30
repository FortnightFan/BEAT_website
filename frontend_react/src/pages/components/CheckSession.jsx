import { jwtDecode } from 'jwt-decode';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CheckSession = () => {
    const navigate = useNavigate();
    const logout = useContext(useAuth);

    useEffect(() => {
        const interval = setInterval(() => {
            // Retrieve the token from storage
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Convert to seconds

                // Check if the token is expired
                if (decodedToken.exp < currentTime) {
                    console.log("Session expired. Logging out.");
                    logout();
                    navigate('/signin');
                }
            } else {
                // If there is no token, consider it as not valid session
                console.log("No token found. Logging out.");
                logout();
                navigate('/signin');
            }
        }, 60000); // check every 60 seconds

        return () => clearInterval(interval);
    }, [logout, navigate]);

    return null; // This component does not render anything
};

export default CheckSession;

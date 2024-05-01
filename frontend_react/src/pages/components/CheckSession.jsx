import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CheckSession = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    console.log("Session expired. Logging out.");
                    logout();
                    navigate('/signin');
                }
            } else {
                console.log("No token found. Logging out.");
                logout();
                navigate('/signin');
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [logout, navigate]);

    return null;
};

export default CheckSession;

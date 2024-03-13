import React from 'react';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import { Box, Typography } from '@mui/material';
import ProfileContent from './components/ProfileContent';

const Profile = () => {
    return (
        <div>            
            <NavigationBar />
            <ProfileContent/>
            <Footer />
        </div>  
    );
};

export default Profile;

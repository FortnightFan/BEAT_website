import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Logo from './BEAT_Logo_Black.png';
import './Styles.css';

const NavigationBar = () => {
  return (
    <div className="navbar">
      <div>
        {/* <img src={Logo} alt="B.E.A.T Logo" className="site-logo" /> */}
        <IconButton aria-label="delete" size="small">
          <AccessibilityOutlinedIcon fontSize='large'/>
        </IconButton>

        <Button variant="contained" sx={{ ml: 1, backgroundColor: 'orange' }}>About</Button>
        <Button variant="contained" sx={{ ml: 1 }}>Register</Button>
        <Button variant="contained" sx={{ ml: 1 }}>Login</Button>
      </div>
      
    </div>

  );
};

export default NavigationBar;
import React from 'react';
import './Styles.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';

const NavigationBar = () => {
  return (
    <div className="navbar">
      <div>
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
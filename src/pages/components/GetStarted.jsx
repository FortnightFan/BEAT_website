import React from 'react';
import Button from '@mui/material/Button';

const GetStarted = () => {
  return (
    <div className='get_started_background'>
        <div className='get_started'>
            <h1 className="heading_text">Welcome to B.E.A.T.</h1>
        </div>
        <div className='get_started'>
            <h1 className="text">Your personal Body Excercise and Activity Tracker</h1>
        </div>
        <div className='get_started'>
            <Button variant="contained" sx={{ ml: 1 }}>Log in</Button>
            <Button variant="contained" sx={{ ml: 1 }}>Sign Up</Button>
        </div>
    </div>
  );
};

export default GetStarted;
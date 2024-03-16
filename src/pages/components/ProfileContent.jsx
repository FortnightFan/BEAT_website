import { Box, Button} from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const name = "Kevin"
const workoutTips = [
    "Stay hydrated by drinking water before, during, and after your workout.",
    "Incorporate strength training into your workout routine to build muscle and boost metabolism.",
    "Don't forget to warm up before exercising to prevent injuries and improve performance.",
    "Listen to your body and rest when needed. Overtraining can lead to burnout and injuries.",
    "Mix up your workouts to prevent boredom and keep your body challenged. Try new exercises and routines regularly.",
  ];

  const ProfileContent = () => {
  return (
    <div>
        <div className='profile_background' >
            <center className='heading_text'>
                <p>Welcome back, <span style={{ color: 'orange' }}>{name}</span>!</p>
            </center>
            <center className='text'>
                {workoutTips[2]}
            </center>
        </div>
        <Box height={100}/>
        <div>
            <center>
                <NavLink to='/profile/prevworkouts'>
                    <Button variant="contained">Previous Workouts</Button>
                </NavLink>
                
                <Box height={25}/>
                <NavLink to='/profile/bodydata'>
                    <Button variant="contained">Body</Button>
                </NavLink>

                <Box height={50}/>
                <NavLink to='/routineselector'>
                    <Button variant="contained" color="success" size="large">Get Started</Button>
                </NavLink>
                <Box height={25}/>
            </center>
        </div>
    </div>



  );
};

export default ProfileContent;

{/* <Box display="flex" justifyContent="center" alignItems="center">
<img
    src='https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/05/Pull-Day-Workout.jpg?fit=1888%2C1260&ssl=1'
    alt='Banner'
    style={{ maxHeight: '400px', width: '100%', objectFit: 'cover', filter: 'blur(5px)' }}
/>
</Box> */}
import React from 'react';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer.jsx';

import { Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
const previousWorkouts = [
    { name: 'Leg Day', date: '2024-03-10' },
    { name: 'Chest & Triceps', date: '2024-03-08' },
    { name: 'Back & Biceps', date: '2024-03-06' },
  ];

const PrevWorkouts = () => {
    return (
        <div>            
            <NavigationBar />
                <div style={{ maxWidth: 600, margin: 'auto' }}>
                    <Typography variant="h4">
                        Previous Workouts
                    </Typography>
                    <Paper>
                        <List>
                        {previousWorkouts.map((workout, index) => (
                            <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText primary={workout.name} secondary={workout.date} />
                            </ListItem>
                            {index < previousWorkouts.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                        </List>
                    </Paper>
                </div>
            <Footer />   
        </div>  
    );
};

export default PrevWorkouts;

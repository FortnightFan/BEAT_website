import { Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SubNav from './components/Subnav';


// { name: 'Leg Day', date: '2024-03-10' },
// { name: 'Chest & Triceps', date: '2024-03-08' },
// { name: 'Back & Biceps', date: '2024-03-06' },

const PrevWorkouts = () => {
    const [previousWorkouts, setPreviousWorkouts] = useState([]);

    const [runOnce, setRunOnce] = useState(false);

    useEffect(() => {
        if (!runOnce) {
            fetch('/api/prev_workouts')
            .then(response => response.json())
            .then(data => {    
                setPreviousWorkouts(data);
                setRunOnce(true);
            });
        }
    }, [runOnce]); 

    const crumbs = [
        { label: 'Home', path: '/' },
        { label: 'Profile', path: '/profile' },
        { label: 'Previous Workouts', path: '/prevworkouts' }
      ];


    return (
        <>
            <SubNav title="Previous Workouts" crumbs={crumbs} />
        <div>            
                <div style={{ maxWidth: 600, margin: 'auto' }}>
                    <Paper>
                        <List>
                        {previousWorkouts.map((workout, index) => (
                            <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText primary={workout.Name} secondary={workout.Date} />
                                <Typography variant="body2">{String(Math.floor(workout.Time / 60)).padStart(2, '0')}:{String(workout.Time % 60).padStart(2, '0')}</Typography>
                            </ListItem>
                            {index < previousWorkouts.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                        </List>
                    </Paper>
                </div>
        </div>
        </>  
    );
};

export default PrevWorkouts;

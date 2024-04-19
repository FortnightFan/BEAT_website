import React, { useState, useEffect } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';


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




    return (
        <div>            
                <div style={{ maxWidth: 600, margin: 'auto' }}>
                    <Typography variant="h4">
                        Previous Workouts
                    </Typography>
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
    );
};

export default PrevWorkouts;

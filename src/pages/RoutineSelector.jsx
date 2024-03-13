import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';

const RoutineSelector = () => {
  const [routines, setRoutines] = React.useState([
    'Push/Pull/Legs',
    'Public Gym',
    'Home Workout...',
    // ... more routines
  ]);

  const handleAddRoutine = () => {
    // Logic for adding a new routine
    // You should replace this with a prompt or a form where the user can enter the name of the new routine
    const newRoutineName = 'New Routine'; 
    setRoutines([...routines, newRoutineName]);
  };

  return (
    <>
      <NavigationBar /> {/* NavigationBar at the top */}
      <Container disableGutters maxWidth={false}>
        <Paper elevation={3} sx={{ bgcolor: 'primary.main', color: 'white', py: 2 }}>
          <Typography variant="h6" align="center">
            Select a routine
          </Typography>
        </Paper>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <List component="nav" aria-label="routine selector list">
            {routines.map((routine, index) => (
              <ListItem key={index} disableGutters>
                <ListItemText primary={
                  <Typography align="center" variant="subtitle1">
                    {routine} 
                  </Typography>
                } 
                sx={{ textAlign: 'center', flex: 1 }}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            <ListItem disableGutters>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <IconButton aria-label="add" onClick={handleAddRoutine}>
                  <AddIcon />
                </IconButton>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default RoutineSelector;
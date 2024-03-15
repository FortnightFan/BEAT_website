import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AppBar, Box, Container, IconButton, List, ListItem, Paper, Typography } from '@mui/material';
import React from 'react';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';

const WorkoutSelector = () => {
  const [Workouts, setWorkouts] = React.useState([
    'Workout 1',
    'Tuesday',
    'Custom Leg Day',
    // ... more Workouts
  ]);

  const handleAddWorkout = () => {
    const newWorkoutName = window.prompt('Enter the name of the new workout:');
    if (newWorkoutName) {
      setWorkouts([...Workouts, newWorkoutName]);
    }
  };

  const handleRemoveWorkout = (index) => {
    const newWorkouts = Workouts.filter((_, i) => i !== index);
    setWorkouts(newWorkouts);
  };

  return (
    <>
      <NavigationBar />
      <Container disableGutters maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
        <AppBar position="static" sx={{ marginBottom: 2 }}>
          <Typography variant="h6" align="center" sx={{ padding: 1, color: 'white' }}>
            Select a Workout
          </Typography>
        </AppBar>

        <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0, overflow: 'hidden' }}>
          {Workouts.map((Workout, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
              <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 600, flexGrow: 0, width: '100%', margin: 1 }} elevation={2}>
                <IconButton aria-label="remove" onClick={() => handleRemoveWorkout(index)} sx={{ marginLeft: 1 }}>
                  <DeleteIcon />
                </IconButton>
                <Typography variant="subtitle1" sx={{ mx: 2, flexGrow: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {Workout}
                </Typography>
                <IconButton aria-label="edit" sx={{ marginRight: 1 }}>
                  <EditIcon />
                </IconButton>
              </Paper>
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
          <IconButton onClick={handleAddWorkout} size="large">
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Box>

        <Footer />
      </Container>
    </>
  );
};

export default WorkoutSelector;

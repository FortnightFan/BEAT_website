import { useNavigate } from 'react-router-dom';

import { AppBar, Box, Container, List, Typography } from '@mui/material';
import React from 'react';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import HoverListItem from './HoverListItem';
import RenameButton from './RenameButton';

  const WorkoutSelector = () => {
    const [workouts, setworkouts] = React.useState([
      'Push',
      'Pull',
      'Legs',
      // ... more Workouts
    ]);
  
    const navigate = useNavigate();
    const handleSelectworkout = (workoutId) => {
      // Navigate to the exercise selector for the selected workout
      navigate(`/workout/${workoutId}`);
    };
    const handleRenameworkout = (newName, index) => {
      const newworkouts = workouts.map((workout, i) => {
        if (i === index) {
          return newName; // Update the name with the newName received
        }
        return workout;
      });
      setworkouts(newworkouts); // Update the workouts state
    };
  
    const handleAddworkout = (newworkoutName) => {
      setworkouts([...workouts, newworkoutName]);
    };
  
    const handleRemoveworkout = (event, index) => {
      event.stopPropagation();
      const newworkouts = workouts.filter((_, i) => i !== index);
      setworkouts(newworkouts);
    };
  
    return (
      <>
        <Container disableGutters maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <AppBar position="static" sx={{ marginBottom: 2 }}>
            <Typography variant="h6" align="center" sx={{ padding: 1, color: 'white' }}>
              Select a Workout
            </Typography>
          </AppBar>
  
          <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0, overflow: 'hidden', flex: 1 }}>
            {workouts.map((workout, index) => (
              <HoverListItem key={index} onClick={() => handleSelectworkout(index)}>
                <DeleteButton onDelete={(event) => handleRemoveworkout(event, index)} />
                  <Typography variant="subtitle1" sx={{ mx: 2, flexGrow: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {workout}
                  </Typography>
                <RenameButton 
                  promptMessage="Enter the new name for the workout:" // Customize this message as needed
                  onRename={(newName) => handleRenameworkout(newName, index)}/>
              </HoverListItem>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
              <AddButton 
                onAdd={handleAddworkout} 
                promptMessage="Enter the name of the new workout:"/>
            </Box>
          </List>
        </Container>
      </>
    );
  };

export default WorkoutSelector;

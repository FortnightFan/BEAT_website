import { useNavigate } from 'react-router-dom';

import { AppBar, Box, Container, List, Typography } from '@mui/material';
import React from 'react';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import HoverListItem from './HoverListItem';
import RenameButton from './RenameButton';

const RoutineSelector = () => {
  const [routines, setRoutines] = React.useState([
    'Push/Pull/Legs',
    'Public Gym',
    'Home Workout...',
    // ... more routines
  ]);

  const navigate = useNavigate();
  const handleSelectRoutine = (routineId) => {
    // Navigate to the exercise selector for the selected routine
    navigate(`/routine/${routineId}`);
  };
  const handleRenameRoutine = (newName, index) => {
    const newRoutines = routines.map((routine, i) => {
      if (i === index) {
        return newName; // Update the name with the newName received
      }
      return routine;
    });
    setRoutines(newRoutines); // Update the routines state
  };

  const handleAddRoutine = (newRoutineName) => {
    setRoutines([...routines, newRoutineName]);
  };

  const handleRemoveRoutine = (event, index) => {
    event.stopPropagation();
    const newRoutines = routines.filter((_, i) => i !== index);
    setRoutines(newRoutines);
  };

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <AppBar position="static" sx={{ marginBottom: 2 }}>
          <Typography variant="h6" align="center" sx={{ padding: 1, color: 'white' }}>
            Select a Routine
          </Typography>
        </AppBar>

        <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0, overflow: 'hidden', flex: 1 }}>
          {routines.map((routine, index) => (
            <HoverListItem key={index} onClick={() => handleSelectRoutine(index)}>
              <DeleteButton onDelete={(event) => handleRemoveRoutine(event, index)} />
                <Typography variant="subtitle1" sx={{ mx: 2, flexGrow: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {routine}
                </Typography>
              <RenameButton 
                promptMessage="Enter the new name for the routine:" // Customize this message as needed
                onRename={(newName) => handleRenameRoutine(newName, index)}/>
            </HoverListItem>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
            <AddButton 
              onAdd={handleAddRoutine} 
              promptMessage="Enter the name of the new routine:"/>
          </Box>
      </List>
    </Container>
    </>
  );
};

export default RoutineSelector;

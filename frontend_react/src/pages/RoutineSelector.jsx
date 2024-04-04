import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AppBar, Box, Container, IconButton, List, ListItem, Paper, Typography } from '@mui/material';
import React from 'react';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';

const RoutineSelector = () => {
  const [routines, setRoutines] = React.useState([
    'Push/Pull/Legs',
    'Public Gym',
    'Home Workout...',
    // ... more routines
  ]);

  const handleAddRoutine = () => {
    const newRoutineName = window.prompt('Enter the name of the new routine:');
    if (newRoutineName) {
      setRoutines([...routines, newRoutineName]);
    }
  };

  const handleRemoveRoutine = (index) => {
    const newRoutines = routines.filter((_, i) => i !== index);
    setRoutines(newRoutines);
  };

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
        <AppBar position="static" sx={{ marginBottom: 2 }}>
          <Typography variant="h6" align="center" sx={{ padding: 1, color: 'white' }}>
            Select a Routine
          </Typography>
        </AppBar>

        <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0, overflow: 'hidden' }}>
          {routines.map((routine, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
              <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 600, flexGrow: 0, width: '100%', margin: 1 }} elevation={2}>
                <IconButton aria-label="remove" onClick={() => handleRemoveRoutine(index)} sx={{ marginLeft: 1 }}>
                  <DeleteIcon />
                </IconButton>
                <Typography variant="subtitle1" sx={{ mx: 2, flexGrow: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {routine}
                </Typography>
                <IconButton aria-label="edit" sx={{ marginRight: 1 }}>
                  <EditIcon />
                </IconButton>
              </Paper>
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
          <IconButton onClick={handleAddRoutine} size="large">
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Box>

      </Container>
    </>
  );
};

export default RoutineSelector;

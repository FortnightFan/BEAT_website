import { AppBar, Box, Button, Container, Grid, List, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AddButton from '../AddButton';
import DeleteButton from '../DeleteButton';
import HoverListItem from '../HoverListItem';
import RenameButton from '../RenameButton';

const name = "Kevin"
const workoutTips = [
    "TIP! Stay hydrated by drinking water before, during, and after your workout.",
    "Incorporate strength training into your workout routine to build muscle and boost metabolism.",
    "Don't forget to warm up before exercising to prevent injuries and improve performance.",
    "Listen to your body and rest when needed. Overtraining can lead to burnout and injuries.",
    "Mix up your workouts to prevent boredom and keep your body challenged. Try new exercises and routines regularly.",
  ];

const ProfileContent = () => {
  const [routines, setRoutines] = React.useState([]);
    const [runOnce, setRunOnce] = useState(false);

    useEffect(() => {
        if (!runOnce) {
            fetch('/saved_exercises')
            .then(response => response.json())
            .then(data => { 
              const workoutNames = data.map(item => item.Name);
              setRunOnce(true);
              setRoutines(workoutNames)
            });
        }
    }, []);

  const navigate = useNavigate();

  const handleSelectRoutine = (routineId) => {
    navigate(`/workout/${routineId}`);
  };

  const handleRenameRoutine = async (newName, index) => {
    const newRoutines = routines.map((routine, i) => i === index ? newName : routine);
    setRoutines(newRoutines);
    const response = await fetch('/api/rename_routine', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "Name" : newName,
        "ID" : index,
      }), 
  });
  const data = await response.json();
  };

  const handleAddRoutine = async (newRoutineName) => {
    setRoutines([...routines, newRoutineName]);
    console.log(routines.length)

    const response = await fetch('/api/add_new_routine', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "Name" : newRoutineName,
        "ID" : routines.length,
      }), 
  });
  const data = await response.json();

  };

  const handleRemoveRoutine = async (event, index) => {
    event.stopPropagation();
    const response = await fetch('/api/remove_routine', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID" : index
      }), 
  });
  const data = await response.json();
  
  setRoutines(routines.filter((_, i) => i !== index));
  };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Welcome Header */}
        <AppBar position="static" sx={{ marginBottom: 2 }}>
            <Typography variant="h6" align="center" sx={{ padding: 1, color: 'white' }}>
            Welcome back, {name}!
            </Typography>
        </AppBar>
        
        {/* Main Content */}
        <Grid container spacing={2}>
            {/* Left Grid - Profile content and buttons */}
            <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>

            <div className='profile_background' >
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

                </center>
            </div>
            </Box>
            </Grid>

            {/* Right Grid - Plans list */}
            <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
            Get Started. Select a Workout Plan.
          </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {routines.map((routine, index) => (
                <HoverListItem key={index} onClick={() => handleSelectRoutine(index)}>
                    <DeleteButton onDelete={(event) => handleRemoveRoutine(event, index)} />
                    <Typography variant="subtitle1" sx={{ mx: 2, flexGrow: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {routine}
                    </Typography>
                    <RenameButton onRename={(newName) => handleRenameRoutine(newName, index)} promptMessage="Enter the new name for the routine:" />
                </HoverListItem>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
                <AddButton onAdd={handleAddRoutine} promptMessage="Enter the name of the new routine:" />
                </Box>
            </List>
            </Grid>
        </Grid>
        </Container>
    );
};

export default ProfileContent;

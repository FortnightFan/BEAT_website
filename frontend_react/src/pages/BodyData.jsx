import { AppBar, Box, Container, Paper, TextField, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import SubNav from './components/Subnav';

export default function BodyDataForm() {
  // States to store the input values
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState('');
  const [bodyWater, setBodyWater] = useState('');
  const [skeletalMuscle, setSkeletalMuscle] = useState('');

  // Handlers for the input changes
  const handleHeightChange = (event) => setHeight(event.target.value);
  const handleWeightChange = (event) => setWeight(event.target.value);
  const handleBMIChange = (event) => setBMI(event.target.value);
  const handleBodyWaterChange = (event) => setBodyWater(event.target.value);
  const handleSkeletalMuscleChange = (event) => setSkeletalMuscle(event.target.value);

  const crumbs = [
    { label: 'Home', path: '/' },
    { label: 'Profile', path: '/profile' },
    { label: 'Body Data', path: '/BodyData' }
  ];

  return (
    <>
    <SubNav title="Body Data" crumbs={crumbs} />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container component="main" maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <AppBar position="static" color="primary" sx={{ marginBottom: 4 }}>
          </AppBar>

          <Paper elevation={4} sx={{ padding: 3, marginBottom: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTextField-root': { margin: 1 },
              }}
            >
              <TextField label="Height" variant="outlined" value={height} onChange={handleHeightChange} />
              <TextField label="Weight" variant="outlined" value={weight} onChange={handleWeightChange} />
              <TextField label="BMI" variant="outlined" value={bmi} onChange={handleBMIChange} />
              <TextField label="Body Water %" variant="outlined" value={bodyWater} onChange={handleBodyWaterChange} />
              <TextField label="Skeletal Muscle %" variant="outlined" value={skeletalMuscle} onChange={handleSkeletalMuscleChange} />
            </Box>
            <Typography sx={{ marginTop: 2 }}>
              <div>Height: {height}</div>
              <div>Weight: {weight}</div>
              <div>BMI: {bmi}</div>
              <div>Body Water %: {bodyWater}</div>
              <div>Skeletal Muscle %: {skeletalMuscle}</div>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

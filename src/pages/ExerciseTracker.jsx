import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import RemoveIcon from '@mui/icons-material/Remove';
import { AppBar, Box, Button, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';

const ExerciseTracker = () => {
  const [sets, setSets] = useState(2);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(200);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavigationBar />
      <AppBar position="static">
        <Typography variant="h4" align="center" sx={{ padding: 2, color: 'white' }}>
          Lat Pull Down
        </Typography>
      </AppBar>

      <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', py: 4 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {/* One column for text */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper sx={{ p: 2, mb: 2 }} elevation={2}>
              <Typography>Sets</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => setSets(sets - 1)} disabled={sets <= 1}><RemoveIcon /></IconButton>
                <Typography sx={{ mx: 2 }}>{sets}/4</Typography>
                <IconButton onClick={() => setSets(sets + 1)}><AddIcon /></IconButton>
              </Box>
            </Paper>
            <Paper sx={{ p: 2, mb: 2 }} elevation={2}>
              <Typography>Reps</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => setReps(reps - 1)} disabled={reps <= 1}><RemoveIcon /></IconButton>
                <Typography sx={{ mx: 2 }}>{reps}</Typography>
                <IconButton onClick={() => setReps(reps + 1)}><AddIcon /></IconButton>
              </Box>
            </Paper>
            <Paper sx={{ p: 2, mb: 2 }} elevation={2}>
              <Typography>Weight</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => setWeight(weight - 5)} disabled={weight <= 5}><RemoveIcon /></IconButton>
                <Typography sx={{ mx: 2 }}>{weight}</Typography>
                <IconButton onClick={() => setWeight(weight + 5)}><AddIcon /></IconButton>
              </Box>
            </Paper>
            {/* Historical data section */}
            <Paper sx={{ p: 2, mb: 2 }} elevation={2}>
              <Typography sx={{ mb: 2 }}>Previous Sets</Typography>
              {/* Implement historical data display here */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* Mock data, replace with actual data */}
                <Typography>Set 1: 10 reps - 150 lbs</Typography>
                <Typography>Set 2: 10 reps - 155 lbs</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* One column for the check button */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button variant="contained" color="success" size="large" sx={{ height: '100%' }}>
              <CheckCircleIcon sx={{ fontSize: 40 }} />
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default ExerciseTracker;

import { AppBar, Box, Container, List, ListItem, Paper, Typography } from '@mui/material';
import React from 'react';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';

// Import icons from assets
import AbsIcon from '../assets/Icons/AbdominalMuscleIcon.png';
import BackIcon from '../assets/Icons/BackMuscleIcon.png';
import BicepsIcon from '../assets/Icons/BicepsMuscleIcon.png';
import ChestIcon from '../assets/Icons/ChestMuscleIcon.png';
import LegIcon from '../assets/Icons/LegMuscleIcon.png';
import ShoulderIcon from '../assets/Icons/ShouldersMuscleIcon.png';
import TricepsIcon from '../assets/Icons/TricepsMuscleIcon.png';


const StrengthTraining = () => {
  const musclegroups = [
    { name: 'Back', icon: BackIcon },
    { name: 'Biceps', icon: BicepsIcon },
    { name: 'Triceps', icon: TricepsIcon },
    { name: 'Abs', icon: AbsIcon },
    { name: 'Chest', icon: ChestIcon },
    { name: 'Shoulders', icon: ShoulderIcon },
    { name: 'Legs', icon: LegIcon }

  ];

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{
        display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between'
      }}>
        <AppBar position="static" sx={{ marginBottom: 2 }}>
          <Typography variant="h6" align="center" sx={{ padding: 1, color: 'white' }}>
            Strength Training
          </Typography>
        </AppBar>

        <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0, overflow: 'hidden' }}>
          {musclegroups.map((musclegroup, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
              <Paper sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 600, width: '100%', margin: 1
              }} elevation={2}>
                <Typography variant="subtitle1" sx={{
                  flexGrow: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', marginLeft: 2
                }}>
                  {musclegroup.name}
                </Typography>
                <img src={musclegroup.icon} alt={musclegroup.name} style={{ width: 50, height: 50, marginLeft: 16 }} />
              </Paper>
            </ListItem>
          ))}
        </List>

      </Container>
    </>
  );
};

export default StrengthTraining;
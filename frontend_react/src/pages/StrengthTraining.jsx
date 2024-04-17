import { AppBar, Box, Container, List, ListItem, Paper, Typography } from '@mui/material';
import React from 'react';
import HoverListItem from './HoverListItem';

// Import icons from assets
import AbsIcon from '../assets/Icons/AbdominalMuscleIcon.png';
import BackIcon from '../assets/Icons/BackMuscleIcon.png';
import BicepsIcon from '../assets/Icons/BicepsMuscleIcon.png';
import ChestIcon from '../assets/Icons/ChestMuscleIcon.png';
import LegIcon from '../assets/Icons/LegMuscleIcon.png';
import ShoulderIcon from '../assets/Icons/ShouldersMuscleIcon.png';
import TricepsIcon from '../assets/Icons/TricepsMuscleIcon.png';

import CreateWorkoutList from './components/CreateWorkoutList';

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
      <CreateWorkoutList/>
      <Container disableGutters maxWidth={false} sx={{
        display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between'
      }}>
        <AppBar position="static" sx={{ marginBottom: 2 }}>
          <Typography variant="h6" align="center" sx={{ padding: 1, color: 'white' }}>
            Strength Training
          </Typography>
        </AppBar>

        <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0, overflow: 'hidden', flex: 1 }}>
          {musclegroups.map((musclegroup, index) => (
            <HoverListItem key={index} sx={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 600, width: '100%', margin: 1 }}>
                <Typography variant="subtitle1" sx={{
                  flexGrow: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', marginLeft: 2
                }}>
                  {musclegroup.name}
                </Typography>
                <img src={musclegroup.icon} alt={musclegroup.name} style={{ width: 50, height: 50, marginLeft: 16 }} />
              </div>
            </HoverListItem>
          ))}
        </List>

      </Container>
    </>
  );
};

export default StrengthTraining;
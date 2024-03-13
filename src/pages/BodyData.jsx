import { AppBar, Box, Container, Paper, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';

export default function BodyDataForm() {
  return (
    <>
    <NavigationBar />
    <Container maxWidth="sm" component="main">
      <AppBar position="static" color="primary" sx={{ marginBottom: 4 }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Body Data
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper elevation={4} sx={{ padding: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': { margin: 1 }, // Add space between text fields
          }}
        >
          <TextField label="Height" variant="outlined" />
          <TextField label="Weight" variant="outlined" />
          <TextField label="BMI" variant="outlined" />
          <TextField label="Body Water %" variant="outlined" />
          <TextField label="Skeletal Muscle %" variant="outlined" />
          {/* Add more TextFields as needed */}
        </Box>
      </Paper>
    </Container>
    <Footer />
  </>
  );
}

import React from 'react';
import { AppBar, Box, Container, Typography, Paper, IconButton } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

const WorkoutCategories = () => {
    return (
        <>
            <Container disableGutters maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
                <AppBar position="static" sx={{ marginBottom: 2 }}>
                    <Typography variant="h6" align="center" sx={{ padding: 1, color: 'white' }}>
                        Workout Categories
                    </Typography>
                </AppBar>

                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Paper sx={{ width: 200, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h4">Strength Training</Typography>
                    </Paper>
                    <Paper sx={{ width: 200, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h4">Aerobic Exercises</Typography>
                    </Paper>
                    <Paper sx={{ width: 200, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h4">Calisthenics</Typography>
                    </Paper>
                    <Paper sx={{ width: 200, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h4">High Intensity Interval Training</Typography>
                    </Paper>
                    <Paper sx={{ width: 200, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h4">Customize a Workout</Typography>
                    </Paper>
                </Box>

            </Container>
        </>
    );
};

export default WorkoutCategories;
import React, { useState } from 'react';
import { AppBar, Box, Container, Typography, Paper, IconButton } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

const AllExercises = () => {
    const initialExercises = ['Bench Press', 'Squat', 'Dumbbell Curl', 'Lat Pulldown', 'Deadlift'];
    const [exercises, setExercises] = useState(initialExercises);

    const handleAddExercise = () => {
        const newExerciseName = window.prompt('Enter the name of the new exercise:');
        if (newExerciseName) {
            setExercises([...exercises, newExerciseName]);
        }
    };

    return (
        <>
            <NavigationBar />
            <Container disableGutters maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
                <AppBar position="static" sx={{ marginBottom: 2 }}>
                    <Typography variant="h6" align="center" sx={{ padding: 1, color: 'white' }}>
                        All Exercises
                    </Typography>
                </AppBar>

                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                    {exercises.map((exercise, index) => (
                        <Paper
                            key={index}
                            sx={{
                                width: 200,
                                height: 200,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleAddExercise(exercise)}
                        >
                            <Typography variant="h4">{exercise}</Typography>
                        </Paper>
                    ))}
                </Box>

                <Footer />
            </Container>
        </>
    );
};

export default AllExercises;

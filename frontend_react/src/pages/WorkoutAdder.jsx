// WorkoutAdder.jsx
import { AppBar, Box, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stopwatch from './components/Stopwatch';

const WorkoutAdder = ({ workoutId }) => {
    const navigate = useNavigate();
    const { workoutID } = useParams();

    // Define state variables
    const [workoutName, setWorkoutName] = useState('');
    const [exerciseDetails, setExerciseDetails] = useState({});
    const [workoutList, setWorkoutList] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [sets, setSets] = useState([]);
    const [reps, setReps] = useState([]);
    const [weight, setWeight] = useState([]);

    const [runOnce, setRunOnce] = useState(false);

    useEffect(() => {
        // This function is defined within useEffect to avoid the exhaustive-deps warning
        const fetchData = async () => {
          const response = await fetch('/api/saved_exercises', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "ID": workoutID }),
          });
          
          const data = await response.json();
          if (data === "-1") {
            console.log("ERROR: Data not found");
          } else {
            setWorkoutName(data.Name);
            const initialSetRepsWeight = new Array(data.Exercises.length).fill(0);
            setSets(initialSetRepsWeight);
            setReps(initialSetRepsWeight);
            setWeight(initialSetRepsWeight);
            setWorkoutList(data.Exercises);
          }
        };
      
        if (!runOnce) {
          fetchData();
          setRunOnce(true); // Make sure this is set after fetching data to prevent infinite loop
        }
        // Including workoutID in the dependency array to ensure effect reruns if workoutID changes
      }, [runOnce, workoutID]); 


    const handleSetCountChange = (exerciseId, setCount) => {
        setExerciseDetails(prevDetails => {
            const newDetails = { ...prevDetails };
            const setsArray = Array.from({ length: setCount }, () => ({ reps: '', weight: '' }));
            newDetails[exerciseId] = setsArray;
            return newDetails;
        });
    };

    const handleRepWeightChange = (exerciseId, setIndex, type, value) => {
        setExerciseDetails(prevDetails => {
            const newDetails = { ...prevDetails };
            const updatedSets = [...newDetails[exerciseId]];
            updatedSets[setIndex] = { ...updatedSets[setIndex], [type]: value };
            newDetails[exerciseId] = updatedSets;
            return newDetails;
        });
    };
    
    
    const handleSave = async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const dateString = `${year}-${month}-${day}`;
        const response = await fetch('/api/add_prev_workout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Date: dateString,
                Name: workoutName,
                Time: elapsedTime
            }), 
        });

        navigate(`/profile`);
    };

    const handleElapsedTimeChange = (newElapsedTime) => {
        setElapsedTime(newElapsedTime);
    };

    return (
        <Container>
            <AppBar position="static">
                <Typography variant="h6" align="center">{workoutName}</Typography>
            </AppBar>
            <Stopwatch onElapsedTimeChange={handleElapsedTimeChange} />

            <Box sx={{ my: 2 }} justifyContent={'center'} alignItems={'center'}>
                {workoutList.map((exercise, index) => (
                    <Paper key={index} elevation={2} sx={{ p: 2, my: 1 }}>
                        <Typography variant="h6">{exercise.name}</Typography>
                            <Stack spacing='20px' direction="row" style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={require("../assets/exercises/" + exercise.images[0])} alt={exercise.name} style={{ maxWidth: '35%', maxHeight: '35vh', borderRadius: '25px', padding: '10px' }}/>
                                <img src={require("../assets/exercises/" + exercise.images[1])} alt={exercise.name} style={{ maxWidth: '35%', maxHeight: '35vh', borderRadius: '25px', padding: '10px' }}/>
                            </Stack>
                            <Paper elevation={2} style={{ margin: '0 auto', maxHeight: '300px', overflow: 'auto', padding: '10px', marginBottom: '30px' }}>
                                {exercise.instructions.map((instruction, index) => (
                                    <Typography key={index} variant="h6" align="left" paragraph>
                                        {index+1} - {instruction}
                                    </Typography>
                                ))}
                            </Paper>
                            <Grid container justifyContent="center" alignItems="center" padding={1} sx={{ mx: 18, my: 1 }}>
                                <Grid item width={'35%'}>
                                    <TextField
                                        alignItems="center"
                                        type="number"
                                        label="Number of Sets"
                                        value={exerciseDetails[exercise.id]?.length || 0}
                                        onChange={(e) => handleSetCountChange(exercise.id, parseInt(e.target.value, 10))}
                                        sx={{ width: '35%' }}
                                    />
                                </Grid>
                            </Grid>
                        {exerciseDetails[exercise.id]?.map((set, index) => (
                            <Grid container justifyContent="center" alignItems="center" key={index} padding={1} sx={{ mx: 10, my: 1 }}>
                                <Grid item>
                                    <TextField
                                        type="number"
                                        label={`Set ${index + 1} Reps`}
                                        value={set.reps}
                                        onChange={(e) => handleRepWeightChange(exercise.id, index, 'reps', parseInt(e.target.value, 10))}
                                        sx={{ mx: 1}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={6} lg={4}>
                                    <TextField
                                        type="number"
                                        label={`Set ${index + 1} Weight`}
                                        value={set.weight}
                                        onChange={(e) => handleRepWeightChange(exercise.id, index, 'weight', parseInt(e.target.value, 10))}
                                    />
                                </Grid>
                            </Grid>
                        ))}
                    </Paper>
                ))}
                {/* Save Button */}
                <Grid container justifyContent="center" style={{ marginTop: 20 }}>
                    <Grid item>
                        <button 
                            onClick={handleSave} 
                            style={{ fontSize: '1.5em', padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '30px' }}
                            >
                            Save Workout
                        </button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default WorkoutAdder;

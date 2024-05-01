// ExerciseList.jsx
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid, Paper, Stack, TextField, Typography, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SetTimer from './components/SetTimer';
import Stopwatch from './components/Stopwatch';
import SubNav from './components/Subnav';

const WorkoutAdder = ({ workoutId }) => {
    const navigate = useNavigate();
    const { workoutID } = useParams();

    const [workoutName, setWorkoutName] = useState('');
    const [exerciseDetails, setExerciseDetails] = useState({});
    const [workoutList, setWorkoutList] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [sets, setSets] = useState([]);
    const [reps, setReps] = useState([]);
    const [weight, setWeight] = useState([]);

    const [runOnce, setRunOnce] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ID: workoutID,
                })
            };

            const response = await fetch("http://127.0.0.1:8000/api/grab_workout_data/", requestOptions);
            const data = await response.json();
            //console.log("Fetched workout data:", data); 
            setWorkoutList(data)
            const initialSetRepsWeight = new Array(data.length).fill(0);
            setSets(initialSetRepsWeight);
            setReps(initialSetRepsWeight);
            setWeight(initialSetRepsWeight);
        };
        fetchData();

        if (!runOnce) {
            fetchData();
            setRunOnce(true);
        }
    }, [runOnce, workoutID]);

    useEffect(() => {
        const url = window.location.pathname;
        const match = url.match(/\d+/);
        const number = match ? parseInt(match[0]) : null;
        const token = localStorage.getItem("token");

        if (!runOnce) {
            const fetchData = async () => {
                const requestOptions = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        ID: number,
                    }),
                };
                const response = await fetch("http://127.0.0.1:8000/api/grab_workout_name/", requestOptions);
                const data = await response.json();
                setWorkoutName(data.Name)
            };
            fetchData();
        }
    }, []);



    const preventNegativeValues = (e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()

    const handleSetCountChange = (exerciseId, setCount) => {
        setExerciseDetails(prevDetails => {
            const newDetails = { ...prevDetails };
            const setsArray = Array.from({ length: setCount }, () => ({ reps: '', weight: '' }));
            newDetails[exerciseId] = setsArray;
            return newDetails;
        });
    };

    const handleRepWeightChange = (exerciseId, setIndex, type, value) => {
        const stringValue = String(value);
        const filteredValue = stringValue.replace(/[^0-9]/g, '');
        if (filteredValue === '') {
            setExerciseDetails(prevDetails => {
                const newDetails = { ...prevDetails };
                const updatedSets = [...newDetails[exerciseId]];
                updatedSets[setIndex] = { ...updatedSets[setIndex], [type]: value };
                newDetails[exerciseId] = updatedSets;
                return newDetails;
            });
        } else {
            const numericValue = parseInt(value, 10);
            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 999) {
                setExerciseDetails(prevDetails => {
                    const newDetails = { ...prevDetails };
                    const updatedSets = [...newDetails[exerciseId]];
                    updatedSets[setIndex] = { ...updatedSets[setIndex], [type]: numericValue };
                    newDetails[exerciseId] = updatedSets;
                    return newDetails;
                });
            }
        }
    };


    const handleSave = async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        const token = localStorage.getItem("token");


        const response = await fetch('http://127.0.0.1:8000/api/save_previous_workout/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
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
    const [savedTimes, setSavedTimes] = useState([]);

    const handleSaveSetTime = (exerciseId, setIndex, timeElapsed, time, reps, weight) => {
        setExerciseDetails(prevDetails => {
            const newDetails = { ...prevDetails };
            if (!newDetails[exerciseId]) {
                newDetails[exerciseId] = [];
            }
            if (setIndex >= newDetails[exerciseId].length) {
                newDetails[exerciseId].length = setIndex + 1;
            }
            newDetails[exerciseId][setIndex] = { ...newDetails[exerciseId][setIndex], time: timeElapsed };
            return newDetails;
        });
    };

    const crumbs = [
        { label: 'Home', path: '/' },
        { label: 'Profile', path: '/profile' },
        { label: 'Create Workout', path: `/workout/${workoutID}` },
        { label: 'Workout', path: '/start' }
    ];

    return (
        <>
            <SubNav title={"Workout: " + workoutName} crumbs={crumbs} />

            <Container maxWidth="md">
                <Stopwatch onElapsedTimeChange={handleElapsedTimeChange} />

                <Box sx={{ my: 2 }} justifyContent={'center'} alignitems={'center'}>
                    {workoutList.map((exercise, index) => (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">{exercise.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Paper key={index} elevation={2} sx={{ p: 2, my: 1 }}>

                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="subtitle1">Tutorial Details</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Stack spacing='20px' direction="row" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img src={require("../assets/exercises/" + exercise.images[0])} alt={exercise.name} style={{ maxWidth: '35%', maxHeight: '35vh', borderRadius: '25px', padding: '10px' }} />
                                                <img src={require("../assets/exercises/" + exercise.images[1])} alt={exercise.name} style={{ maxWidth: '35%', maxHeight: '35vh', borderRadius: '25px', padding: '10px' }} />
                                            </Stack>
                                            <Paper elevation={2} style={{ margin: '0 auto', maxHeight: '300px', overflow: 'auto', padding: '10px', marginBottom: '30px' }}>
                                                {exercise.instructions.map((instruction, index) => (
                                                    <Typography key={index} variant="h6" align="left" paragraph>
                                                        {index + 1} - {instruction}
                                                    </Typography>
                                                ))}
                                            </Paper>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Grid container justifyContent="center" alignitems="center" padding={1} sx={{ mx: 'auto', my: 1 }}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <TextField
                                                alignitems="center"
                                                type="number"
                                                label="Number of Sets"
                                                value={exerciseDetails[exercise.id]?.length || 0}
                                                onChange={(e) => handleSetCountChange(exercise.id, parseInt(e.target.value, 10))}
                                                fullWidth
                                                InputProps={{
                                                    inputProps: {
                                                        min: 0,
                                                        max: 10
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    {exerciseDetails[exercise.id]?.map((set, index) => (
                                        <Grid container justifyContent="center" alignItems="center" key={index} sx={{ mx: 'auto', my: 2 }}>
                                            {/* Reps and Weight inputs */}
                                            <Grid item xs={12} sm={5} md={4}>
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    label={`Set ${index + 1} Reps`}
                                                    value={set.reps}
                                                    onChange={(e) => handleRepWeightChange(exercise.id, index, 'reps', parseInt(e.target.value, 10))}
                                                    onKeyDown={preventNegativeValues}
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 0,
                                                            max: 99,
                                                            inputMode: 'numeric',
                                                            pattern: '[0-9]*',
                                                        },
                                                        style: {
                                                            borderColor: (set.reps < 0 || set.reps > 999) ? 'red' : 'default'
                                                        }
                                                    }}
                                                    sx={{ mb: 1 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={5} md={4}>
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    label={`Set ${index + 1} Weight`}
                                                    value={set.weight}
                                                    onChange={(e) => handleRepWeightChange(exercise.id, index, 'weight', e.target.value)}
                                                    onKeyDown={preventNegativeValues}
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 0,
                                                            max: 999
                                                        },
                                                        style: {
                                                            borderColor: (set.weight < 0 || set.weight > 999) ? 'red' : 'default'
                                                        }
                                                    }}
                                                    sx={{ mb: 1, borderColor: (set.weight < 0 || set.weight > 999) ? 'red' : 'default' }}
                                                />
                                            </Grid>

                                            {/* Timer to the right, vertically centered between Reps and Weight */}
                                            <Grid item xs={12} sm={2} md={4} container alignitems="center" justifyContent="flex-end">
                                                <SetTimer
                                                    index={index}
                                                    restDuration={5}
                                                    onSaveTime={(time) => handleSaveSetTime(exercise.id, index, time)}
                                                    // Pass a unique key
                                                    key={`set-timer-${exercise.id}-${index}`}
                                                />
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Paper>
                            </AccordionDetails>
                        </Accordion>
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
        </>
    );
};

export default WorkoutAdder;

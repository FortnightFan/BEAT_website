import StartIcon from '@mui/icons-material/PlayArrow';
import { Alert, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SubNav from './Subnav';

function CreateWorkoutList() {
    const { workoutID } = useParams();
    const theme = useTheme();
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [selectedMuscle, setSelectedMuscle] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [workoutList, setWorkoutList] = useState([]);
    const [FilteredExercises, setFilteredExercises] = useState(null);
    const [WorkoutTitle, setWorkoutTitle] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [isSaved, setIsSaved] = useState(true);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const navigate = useNavigate();

    const handleSaveWorkoutList = async () => {
<<<<<<< HEAD
        //console.log('Attempting to save workout...');
=======
        console.log('Attempting to save workout...');
>>>>>>> main
        if (workoutList.length > 0) {
            const token = localStorage.getItem("token");
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "ID": workoutID,
                    "exercises": workoutList,
                }),
            };
    
            try {
                const response = await fetch("http://127.0.0.1:8000/api/save_workout_data/", requestOptions);
                const data = await response.json();
<<<<<<< HEAD
                //console.log('Workout saved', data);
=======
                console.log('Workout saved', data);
>>>>>>> main
                setUnsavedChanges(false);
                setOpenConfirmDialog(false);
            } catch (error) {
                console.error('Failed to save workout', error);
            }
        }
    };

    const handleStartWorkout = () => {
        if (unsavedChanges) {
            //console.log("Opening Confirm Dialog");
            setOpenConfirmDialog(true);
        } else {
            setUnsavedChanges(false)
            //console.log('Starting workout');
            navigate(`/workout/${workoutID}/start`);
        }
    };

    const handleCloseDialog = () => {
        setOpenConfirmDialog(false);
    };

    const handleConfirmSave = async () => {
        await handleSaveWorkoutList();
        navigate(`/workout/${workoutID}/start`);
    };

    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
    };
    const handleMuscleChange = (event) => {
        setSelectedMuscle(event.target.value);
    };
    const handleEquipmentChange = (event) => {
        setSelectedEquipment(event.target.value);
    };

    const addWorkout = (exercise) => {
        if (exercise && exercise.exercise) {
            setWorkoutList(workoutList => [...workoutList, exercise.exercise]);
            setUnsavedChanges(false);
        }
        else {
            setWorkoutList(workoutList => [...workoutList, exercise]);
        }
        setClicked(true);
        setSnackbarOpen(true);
        setUnsavedChanges(true);
        setTimeout(() => {
            setClicked(false);
            setWorkoutList(currentList =>
                currentList.map(item => ({ ...item, isNew: false }))
            );
        }, 300);

    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const removeWorkout = (exerciseToRemove) => {
        const index = workoutList.findIndex(exercise => exercise === exerciseToRemove);

        if (index !== -1) {
            setWorkoutList(workoutList => {
                const newList = [...workoutList];
                newList.splice(index, 1);
                return newList;
            });
        }
        setUnsavedChanges(true);
    };
    const saveWorkoutData = async () => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const url = window.location.pathname;
            const match = url.match(/\d+/);
            const number = match ? parseInt(match[0]) : null;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "ID": number,
                    "exercises": workoutList,
                }),
            };
            const response = await fetch("http://127.0.0.1:8000/api/save_workout_data/", requestOptions);
            const data = await response.json();
        };

        if (workoutList.length > 0) {
            fetchData();
        }
        setUnsavedChanges(false);
    };

    const sendData = async () => {
        if (selectedDifficulty !== '' || selectedEquipment !== '' || selectedMuscle !== '') {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    level: selectedDifficulty,
                    equipment: selectedEquipment,
                    primaryMuscles: [selectedMuscle],
                }),
            };
            const response = await fetch("http://127.0.0.1:8000/api/filter/", requestOptions);
            const data = await response.json();
            const resultList = data.results.map(item => ({
                ...item,
                images: eval(item.images),
                instructions: eval(item.instructions),
                primaryMuscles: eval(item.primaryMuscles)
            }));
            setFilteredExercises(resultList);
            setUnsavedChanges(false);
            setOpenConfirmDialog(false);
        }

    };

    const [runOnce, setRunOnce] = useState(false);

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
                const response = await fetch("http://127.0.0.1:8000/api/grab_workout_data/", requestOptions);
                const data = await response.json();
                for (const exercise of data) {
                    //console.log(exercise.name);
                    addWorkout(exercise);
                }
            };
            fetchData();
            setRunOnce(true);
            setUnsavedChanges(false);
        }
    }, [runOnce]);

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
                setWorkoutTitle(data.Name)
                setUnsavedChanges(false);
            };
            fetchData();
        }
    }, []);

    const ButtonStyles = {
        backgroundColor: "green",
        color: "white",
        marginTop: '20px',
        marginBottom: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        '&:hover': {
            backgroundColor: "#45a049",
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
        },
    };

    const crumbs = [
        { label: 'Home', path: '/' },
        { label: 'Profile', path: '/profile' },
        { label: 'Create Workout', path: '/CreateWorkoutList' }
    ];

    return (
        <>
            <SubNav title={`Create Workout: ${WorkoutTitle}`} crumbs={crumbs} />
            <Container maxWidth="md">
                <div>
                    <div style={{ display: 'flexGrow', justifyContent: 'center', alignItems: 'center' }}>
                        <Stack direction="column">
                            <Stack direction="row" spacing={2}>

                                <FormControl style={{ width: '200px', marginTop: '10px', paddingTop: '10px' }}>
                                    {/* Option 1 */}
                                    <InputLabel id="dropdown-label">Difficulty</InputLabel>
                                    <Select
                                        labelId="dropdown-label"
                                        id="dropdown"
                                        value={selectedDifficulty}
                                        onChange={handleDifficultyChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="beginner">Beginner</MenuItem>
                                        <MenuItem value="intermediate">Intermediate</MenuItem>
                                        <MenuItem value="expert">Expert</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl style={{ width: '200px', marginTop: '10px', paddingTop: '10px' }}>
                                    {/* Option 2 */}
                                    <InputLabel id="dropdown-label">Muscle group</InputLabel>
                                    <Select
                                        labelId="dropdown-label"
                                        id="dropdown"
                                        value={selectedMuscle}
                                        onChange={handleMuscleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="abdominals">Abdominals</MenuItem>
                                        <MenuItem value="abductors">Abductors</MenuItem>
                                        <MenuItem value="adductors">Adductors</MenuItem>
                                        <MenuItem value="biceps">Biceps</MenuItem>
                                        <MenuItem value="calves">Calves</MenuItem>
                                        <MenuItem value="chest">Chest</MenuItem>
                                        <MenuItem value="forearms">Forearms</MenuItem>
                                        <MenuItem value="glutes">Glutes</MenuItem>
                                        <MenuItem value="hamstrings">Hamstrings</MenuItem>
                                        <MenuItem value="lats">Lats</MenuItem>
                                        <MenuItem value="lower back">Lower Back</MenuItem>
                                        <MenuItem value="middle back">Middle Back</MenuItem>
                                        <MenuItem value="neck">Neck</MenuItem>
                                        <MenuItem value="quadriceps">Quadriceps</MenuItem>
                                        <MenuItem value="shoulders">Shoulders</MenuItem>
                                        <MenuItem value="traps">Traps</MenuItem>
                                        <MenuItem value="triceps">Triceps</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl style={{ width: '200px', marginTop: '10px', paddingTop: '10px' }}>
                                    {/* Option 3 */}
                                    <InputLabel id="dropdown-label">Equipment</InputLabel>
                                    <Select
                                        labelId="dropdown-label"
                                        id="dropdown"
                                        value={selectedEquipment}
                                        onChange={handleEquipmentChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="bands">Bands</MenuItem>
                                        <MenuItem value="barbell">Barbell</MenuItem>
                                        <MenuItem value="body only">Body Only</MenuItem>
                                        <MenuItem value="cable">Cable</MenuItem>
                                        <MenuItem value="dumbbell">Dumbbell</MenuItem>
                                        <MenuItem value="e-z curl bar">E-Z curl bar</MenuItem>
                                        <MenuItem value="exercise ball">Exercise Ball</MenuItem>
                                        <MenuItem value="foam roll">Foam Roll</MenuItem>
                                        <MenuItem value="kettlebells">Kettlebells</MenuItem>
                                        <MenuItem value="machine">Machine</MenuItem>
                                        <MenuItem value="medicine ball">Medicine Ball</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </FormControl>

                                <Button variant="contained" style={{ marginTop: '20px', paddingTop: '10px' }} onClick={sendData}>Filter</Button>
                                <Button variant="contained" style={{ backgroundColor: "green", marginTop: '20px', paddingTop: '10px' }} onClick={saveWorkoutData}>Save</Button>


                            </Stack>
                            {/* List contents */}
                            <Paper elevation={0} style={{ maxHeight: "500px", overflow: 'auto', margin: '20px 0' }}>
                                {FilteredExercises === null ? (
                                    <Typography variant="body1" align="center">
                                        Pick some options and press "Filter" to add exercises!
                                    </Typography>
                                ) : (
                                    <div>
                                        <Stack direction="column" spacing={2}>
                                            {FilteredExercises.map((exercise, index) => (
                                                <Paper key={index} elevation={9} sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '15px', overflow: 'hidden', bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100' }}>
                                                    {/* Name on the left */}
                                                    <Typography variant="h6" component="div" sx={{ width: '20%', textAlign: 'center' }}>
                                                        {exercise.name}
                                                    </Typography>

                                                    {/* Image centered */}
                                                    <div style={{ overflow: 'hidden', borderRadius: '15px', width: '35%', display: 'flex', justifyContent: 'center' }}>
                                                        <img src={require(`../../assets/exercises/${exercise.images[0]}`)} alt={exercise.name} style={{ maxWidth: '100%', maxHeight: '25vh' }} />
                                                    </div>

                                                    {/* Add button on the right */}
                                                    <Button onClick={() => addWorkout({ exercise })} variant="contained" sx={{ backgroundColor: 'green', color: 'white', width: '15%' }}>
                                                        Add
                                                    </Button>
                                                </Paper>
                                            ))}
                                        </Stack>
                                    </div>
                                )}
                                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                                        Exercise added to Current Exercises!
                                    </Alert>
                                </Snackbar>
                                <Dialog open={openConfirmDialog} onClose={handleCloseDialog}>
                                    <DialogTitle>{"Unsaved Changes"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            You have unsaved changes. Do you want to save them before starting the workout?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog}>No</Button>
                                        <Button onClick={handleConfirmSave}>Yes, Save</Button>
                                    </DialogActions>
                                </Dialog>
                            </Paper>
                            <Divider sx={{ padding: 3 }} />
                            <Typography variant="h3" align="center" sx={{ padding: 3 }}>
                                Current Exercises
                            </Typography>

                            {/* Selected workout list */}
                            <Paper elevation={0} style={{ margin: '20px' }}>
                                {workoutList && workoutList.length > 0 && (
                                    <div>
                                        <Stack direction="column" spacing='16px'>
                                            {workoutList.map((exercisePicked, i) => (
                                                <Paper key={i} elevation={3}
                                                    sx={{
                                                        padding: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        borderRadius: '15px',
                                                        overflow: 'hidden',
                                                        bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100'
                                                    }}>
                                                    <Typography variant="h6" component="div" style={{ marginBottom: '8px' }}>
                                                        <b>{i + 1}</b>  -  {exercisePicked.name}
                                                    </Typography>

                                                    <Button onClick={() => removeWorkout(exercisePicked)} style={{ backgroundColor: 'red', color: 'white' }} variant="contained">Remove</Button>
                                                </Paper>
                                            ))}
                                        </Stack>
                                    </div>
                                )}
                                {!workoutList || workoutList.length === 0 && (
                                    <Typography variant="body1" align="center">
                                        No workouts selected. Add exercises using the above menu.
                                    </Typography>
                                )}
                            </Paper>
                            <Grid container justifyContent="center" style={{ marginTop: 20 }}>
                                <Grid item>
                                        <Button
                                            variant="contained"
                                            startIcon={<StartIcon />}
                                            sx={ButtonStyles}
                                            onClick={handleStartWorkout}
                                        >
                                            Start
                                        </Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default CreateWorkoutList;
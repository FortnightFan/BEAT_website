import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function CreateWorkoutList() {

    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [selectedMuscle, setSelectedMuscle] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState('');

    const [workoutList, setWorkoutList] = useState([]);

    const [FilteredExercises, setFilteredExercises] = useState(null);

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
        setWorkoutList(workoutList => [...workoutList, exercise])
    }

    const removeWorkout = (exerciseToRemove) => {
        setWorkoutList(workoutList => workoutList.filter(exercise => exercise !== exerciseToRemove));
    };

    const saveData = () => {
        console.log("Saved.")
    };

    const sendData = async () => {
        const response = await fetch('/api/filtered_exercises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                level: selectedDifficulty,
                equipment: selectedEquipment,
                primaryMuscles: [selectedMuscle],
            }), 
        });
        const data = await response.json();
        setFilteredExercises(data);
    };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack direction="column">
            <Stack direction="row" spacing={2}>
                <FormControl style={{ width: '200px',  marginTop: '10px',  paddingTop: '10px' }}>
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

                <FormControl style={{ width: '200px',  marginTop: '10px',  paddingTop: '10px' }}>
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

                <FormControl style={{ width: '200px',  marginTop: '10px',  paddingTop: '10px' }}>
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

                <Button variant="contained" style={{marginTop: '20px',  paddingTop: '10px' }} onClick={sendData}>Filter</Button>
                <Button variant="contained" style={{backgroundColor: "green", marginTop: '20px',  paddingTop: '10px' }} onClick={saveData}>Save</Button>

            </Stack>

            {/* List contents */}
            <Paper elevation={0} style={{ maxHeight: 300, overflow: 'auto', margin: '20px 0'}}>
                {FilteredExercises && (
                    <div>
                        <Stack direction="column" spacing='16px'>
                            {FilteredExercises.map((exercise, index) => (
                                    <Paper key={index} elevation={3}>
                                        <Typography variant="h6" component="div" style={{ marginBottom: '8px'}}>{exercise.name}</Typography>
                                        <Button onClick={() => addWorkout({exercise})} style={{ backgroundColor: 'green', color: 'white' }} variant="contained">Add</Button>
                                    </Paper>                                
                            ))}
                        </Stack>
                    </div>
                )}
            </Paper>

            {/* Selected workout list */}
            <Paper elevation={0} style={{ maxHeight: 300, overflow: 'auto', margin: '20px 0'}}>
                {workoutList && (
                    <div>
                        <Stack direction="column" spacing='16px'>
                            {workoutList.map((exercisePicked, i) => (
                                    <Paper key={i} elevation={3}>
                                        <Typography variant="h6" component="div" style={{ marginBottom: '8px'}}><b>{i+1}</b>  -  {exercisePicked.exercise.name}</Typography>
                                        <img src="/pages/components/0.jpg" alt="image" />
                                        {exercisePicked.exercise.images[0]}
                                        <Button onClick={() => removeWorkout(exercisePicked)} style={{ backgroundColor: 'red', color: 'white' }} variant="contained">Remove</Button>
                                    </Paper>                                
                            ))}
                        </Stack>
                    </div>
                )}
            </Paper>
        </Stack>
        

        
        
    </div>
  );
}

export default CreateWorkoutList;
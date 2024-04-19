// WorkoutAdder.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import Stopwatch from './components/Stopwatch'

const WorkoutAdder = ({ workoutId }) => {
    const { workoutID } = useParams();
    const [workoutName, setWorkoutName] = useState('');
    const [sets, setSets] = useState([]);
    const [reps, setReps] = useState([]);
    const [weight, setWeight] = useState([]);

    const maxSetsReps = 10;

    const [workoutList, setWorkoutList] = useState([]);

    const [runOnce, setRunOnce] = useState(false);

    useEffect(() => {
        if (!runOnce) {
            fetch('/api/saved_exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"ID" : workoutID})
            })
            .then(response => response.json())
            .then(data => {    
                if (data == "-1") {
                    console.log("ERROR: Data not found");
                } else {
                    setWorkoutName(data.Name)
                    const exercises = data.Exercises;
                    for (let i = 0; i < exercises.length; i++) {
                        sets.push(0);
                    }
                    for (let i = 0; i < exercises.length; i++) {
                        reps.push(0);
                    }
                    for (let i = 0; i < exercises.length; i++) {
                        weight.push(0);
                    }
                    console.log(sets)
                    console.log(exercises);
                    setWorkoutList(exercises);
                    setRunOnce(true);
                }
            });
        }
    }, [runOnce]); 



    const handleSetsChange = (value, index) => {
        const newSets = [...sets]; 
        newSets[index] = Math.min(Math.max(0, sets[index] + value), maxSetsReps);
        setSets(newSets);
        console.log(elapsedTime)
    };

    const handleRepsChange = (value, index) => {
        const newReps = [...reps]; 
        newReps[index] = Math.min(Math.max(0, reps[index] + value), maxSetsReps);
        setReps(newReps);
    };

    const navigate = useNavigate();
    
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

    const [elapsedTime, setElapsedTime] = useState(0);
    const handleElapsedTimeChange = (newElapsedTime) => {
        setElapsedTime(newElapsedTime);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <Stopwatch onElapsedTimeChange={handleElapsedTimeChange} />
            <div>
                <p>Elapsed Time: {elapsedTime} seconds</p>
            </div>
            <h1>{workoutName}</h1>
            {workoutList && workoutList.length > 0 && (
                <div>
                    {workoutList.map((exercise, index) => (
                        <div key={index}>
                            <h1 style={{ textAlign: 'center' }}>{exercise.name}</h1>
                            <Stack spacing='20px' direction="row" style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={require("../assets/exercises/" + exercise.images[0])} alt="image" style={{ maxWidth: '35%', maxHeight: '35vh' }}/>
                                <img src={require("../assets/exercises/" + exercise.images[1])} alt="image" style={{ maxWidth: '35%', maxHeight: '35vh' }}/>
                            </Stack>
                            <Paper style={{ maxWidth: '700px', margin: '0 auto', maxHeight: '300px', overflow: 'auto' }}>
                                {exercise.instructions.map((instruction, index) => (
                                    <Typography key={index} variant="h6" align="left" paragraph>
                                        {index+1} - {instruction}
                                    </Typography>
                                ))}
                            </Paper>
                            <div style={{ fontSize: '1.5em', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#c0c0c0', padding: '10px', borderRadius: '5px' }}>
                                <p style={{ margin: '0', marginBottom: '5px' }}>Sets</p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <button style={{ fontSize: '1.5em', padding: '10px', color: 'white', backgroundColor: 'red', border: 'none', cursor: 'pointer' }} onClick={() => handleSetsChange(-1, index)}>-</button>
                                    <input 
                                        type="text" 
                                        value={`${sets[index]}/${maxSetsReps}`} 
                                        readOnly
                                        style={{ fontSize: '1.5em', padding: '5px', width: '300px', textAlign: 'center', marginLeft: '10px', marginRight: '10px' }} 
                                    />
                                    <button style={{ fontSize: '1.5em', padding: '10px', color: 'white', backgroundColor: 'green', border: 'none', cursor: 'pointer' }} onClick={() => handleSetsChange(1, index)}>+</button>
                                </div>
                            </div>

                            {/* Reps Container */}
                            <div style={{ fontSize: '1.5em', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#c0c0c0', padding: '10px', borderRadius: '5px' }}>
                                <p style={{ margin: '0', marginBottom: '5px' }}>Reps</p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <button style={{ fontSize: '1.5em', padding: '10px', color: 'white', backgroundColor: 'red', border: 'none', cursor: 'pointer' }} onClick={() => handleRepsChange(-1, index)}>-</button>
                                    <input 
                                        type="text" 
                                        value={`${reps[index]}/${maxSetsReps}`} 
                                        readOnly
                                        style={{ fontSize: '1.5em', padding: '5px', width: '300px', textAlign: 'center', marginLeft: '10px', marginRight: '10px' }} 
                                    />
                                    <button style={{ fontSize: '1.5em', padding: '10px', color: 'white', backgroundColor: 'green', border: 'none', cursor: 'pointer' }} onClick={() => handleRepsChange(1, index)}>+</button>
                                </div>
                            </div>

                            {/* Weight Container */}
                            <div style={{ fontSize: '1.5em', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#c0c0c0', padding: '10px', borderRadius: '5px' }}>
                                <p style={{ margin: '0', marginBottom: '5px' }}>Weight</p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input 
                                        type="number" 
                                        value={weight[index]} 
                                        min="0" 
                                        onChange={(e) => setWeight(parseInt(e.target.value), index)} 
                                        style={{ fontSize: '1.5em', padding: '5px', width: '300px', textAlign: 'center', marginLeft: '10px', marginRight: '10px' }} 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Save Button */}
                    <button 
                        onClick={handleSave} 
                        style={{ fontSize: '1.5em', padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '30px' }}
                    >
                        SAVE
                    </button>
                </div>
            )}
{!workoutList || workoutList.length === 0 && (
    <div>
        <Typography variant="body1" align="center">
            You didn't add any exercises...
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <NavLink to={`/workout/${workoutID}`}>
                <Button variant="contained">Go back</Button>
            </NavLink>
        </div>
        
    </div>

    
    

)}

           
            

        </div>
    );
};

export default WorkoutAdder;

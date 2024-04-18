// WorkoutAdder.jsx
import React, { useState } from 'react';

const WorkoutAdder = ({ workoutId }) => {
    const [workoutName, setWorkoutName] = useState('');
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const maxSetsReps = 10;

    const handleSetsChange = (value) => {
        const newSets = Math.min(Math.max(0, sets + value), maxSetsReps);
        setSets(newSets);
    };

    const handleRepsChange = (value) => {
        const newReps = Math.min(Math.max(0, reps + value), maxSetsReps);
        setReps(newReps);
    };

    const handleWeightChange = (value) => {
        setWeight(Math.max(0, weight + value));
    };

    const handleSave = () => {
        // Add logic to save workout data
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            {/* Workout Name Input with space at the top */}
            <input 
                type="text" 
                placeholder="Enter Workout Name" 
                value={workoutName} 
                onChange={(e) => setWorkoutName(e.target.value)} 
                style={{ marginBottom: '20px', fontSize: '1.5em', padding: '5px', width: '300px' }} 
            />

            {/* Sets Container */}
            <div style={{ fontSize: '1.5em', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#c0c0c0', padding: '10px', borderRadius: '5px' }}>
                <p style={{ margin: '0', marginBottom: '5px' }}>Sets</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ fontSize: '1.5em', padding: '10px', color: 'white', backgroundColor: 'red', border: 'none', cursor: 'pointer' }} onClick={() => handleSetsChange(-1)}>-</button>
                    <input 
                        type="text" 
                        value={`${sets}/${maxSetsReps}`} 
                        readOnly
                        style={{ fontSize: '1.5em', padding: '5px', width: '300px', textAlign: 'center', marginLeft: '10px', marginRight: '10px' }} 
                    />
                    <button style={{ fontSize: '1.5em', padding: '10px', color: 'white', backgroundColor: 'green', border: 'none', cursor: 'pointer' }} onClick={() => handleSetsChange(1)}>+</button>
                </div>
            </div>

            {/* Reps Container */}
            <div style={{ fontSize: '1.5em', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#c0c0c0', padding: '10px', borderRadius: '5px' }}>
                <p style={{ margin: '0', marginBottom: '5px' }}>Reps</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ fontSize: '1.5em', padding: '10px', color: 'white', backgroundColor: 'red', border: 'none', cursor: 'pointer' }} onClick={() => handleRepsChange(-1)}>-</button>
                    <input 
                        type="text" 
                        value={`${reps}/${maxSetsReps}`} 
                        readOnly
                        style={{ fontSize: '1.5em', padding: '5px', width: '300px', textAlign: 'center', marginLeft: '10px', marginRight: '10px' }} 
                    />
                    <button style={{ fontSize: '1.5em', padding: '10px', color: 'white', backgroundColor: 'green', border: 'none', cursor: 'pointer' }} onClick={() => handleRepsChange(1)}>+</button>
                </div>
            </div>

            {/* Weight Container */}
            <div style={{ fontSize: '1.5em', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#c0c0c0', padding: '10px', borderRadius: '5px' }}>
                <p style={{ margin: '0', marginBottom: '5px' }}>Weight</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ fontSize: '1.5em', padding: '10px', color: 'white', backgroundColor: 'red', border: 'none', cursor: 'pointer' }} onClick={() => handleWeightChange(-1)}>-</button>
                    <input 
                        type="number" 
                        value={weight} 
                        min="0" 
                        onChange={(e) => setWeight(parseInt(e.target.value))} 
                        style={{ fontSize: '1.5em', padding: '5px', width: '300px', textAlign: 'center', marginLeft: '10px', marginRight: '10px' }} 
                    />
                    <button style={{ fontSize: '1.5em', padding: '10px', color: 'white', backgroundColor: 'green', border: 'none', cursor: 'pointer' }} onClick={() => handleWeightChange(1)}>+</button>
                </div>
            </div>

            {/* Save Button */}
            <button 
                onClick={handleSave} 
                style={{ fontSize: '1.5em', padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '30px' }}
            >
                SAVE
            </button>
        </div>
    );
};

export default WorkoutAdder;

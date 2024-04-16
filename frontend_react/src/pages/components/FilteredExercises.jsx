import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function FilteredExercises() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');

    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
    };
    const handleMuscleChange = (event) => {
        setSelectedMuscle(event.target.value);
    };
    const handleEquipmentChange = (event) => {
        setSelectedEquipment(event.target.value);
    };

    const sendData = async () => {
        const response = await fetch('/api/filtered_exercises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                difficulty: selectedDifficulty,
                muscle: selectedMuscle,
                equipment: selectedEquipment}), // Send both fields in the request body
        });
        const data = await response.json();
        console.log(data.message)
    }
  return (
    <div>
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
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Expert">Expert</MenuItem>
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
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
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
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                </Select>
            </FormControl>

            <Button variant="contained" style={{marginTop: '20px',  paddingTop: '10px' }} onClick={sendData}>Filter</Button>
        </Stack>
    </div>
  );
}

export default FilteredExercises;
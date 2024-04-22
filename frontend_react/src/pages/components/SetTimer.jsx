import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const SetTimer = ({ index, restDuration = 30, onSaveTime }) => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isResting, setIsResting] = useState(false);
    const [savedTime, setSavedTime] = useState(null);
    const [restCompleted, setRestCompleted] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1);
            }, 1000);
        } else if (isResting) {
            interval = setInterval(() => {
                setTimeElapsed(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        setIsResting(false);
                        setRestCompleted(true);
                        setTimeElapsed(0);
                        return 0;
                    }
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, isResting]);

    const handleStartStop = () => {
        if (!isActive && !isResting && !restCompleted) {
            setIsActive(true);
            setTimeElapsed(0);
        } else if (isActive) {
            setIsActive(false);
            setIsResting(true);
            setSavedTime(timeElapsed);
            onSaveTime(index, timeElapsed); // Assuming onSaveTime takes an index and time
            setTimeElapsed(restDuration);
        } else if (isResting) {
            setIsResting(false);
            setTimeElapsed(0);
        }
    };

    // Define how to display the time depending on the state
    let displayTime = '';
    if (isActive || restCompleted) {
        displayTime = `Set ${index + 1}: ${timeElapsed} sec`;
    } else if (isResting) {
        displayTime = `Rest: ${timeElapsed} sec`;
    }

    return (
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
            {!isActive && !isResting && savedTime !== null && (
                <Typography variant="h6">Set {index + 1} Time: {savedTime} sec</Typography>
            )}
            {(!restCompleted || isActive) && (
                <>
                    <Typography>{displayTime}</Typography>
                    <Button onClick={handleStartStop} variant="contained" color="primary" size='small'>
                        {isActive ? 'Finish' : isResting ? 'Resting...' : 'Start'}
                    </Button>
                </>
            )}
        </Stack>
    );
};

export default SetTimer;

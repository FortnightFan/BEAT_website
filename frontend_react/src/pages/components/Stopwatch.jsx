import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';

const Stopwatch = ({ onElapsedTimeChange }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let intervalId;
    
        if (isRunning) {
            intervalId = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
                // Invoke the callback with the updated elapsed time
                onElapsedTimeChange(elapsedTime + 1);
            }, 1000);
        } else {
            clearInterval(intervalId); // Clear the interval when stopwatch is not running
        }
    
        return () => clearInterval(intervalId); // Cleanup function to clear interval when component unmounts or when interval changes
    }, [isRunning, onElapsedTimeChange, elapsedTime]);

    const handleStartStop = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    };



    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <Typography variant="h2" align="center" gutterBottom>
                {formatTime(elapsedTime)}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleStartStop}>
                    {isRunning ? 'Stop' : 'Start'}
                </Button>
            </div>
        </div>
    );
};

export default Stopwatch;

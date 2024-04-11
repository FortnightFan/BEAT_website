import Button from '@mui/material/Button';
import React from 'react';
import WeightRack from './WeightRack.jpg';

const Mission = () => {
  return (
    <>
      {/* Empty section break */}
      <div className="section-break"></div>

      {/* Section with two columns */}
      <div className="two-column-section" style={{ flexDirection: 'row-reverse' }}>
        {/* Left side with an image */}
        <div className="left-column">
          <img src={WeightRack} alt="Weight Rack Visual" />
        </div>
        {/* Right side with text */}
        <div className="right-column">
          <h2>Your Goals, Our Mission.</h2>
          <p>
          At B.E.A.T., your fitness aspirations become our mission. We understand that every fitness journey is unique, and that's why we've created a solution that adapts to you. From rigorous workouts to daily physical activities, B.E.A.T captures all aspects of your fitness journey, providing you with a comprehensive view of your progress.
          </p>
          <Button 
            variant="contained"
            sx={{
              mt: 2, 
              py: 1.5,
              '&:hover': {
                backgroundColor: '#c21c1c',
              },
            }}
          >
            Join Now For Free!
          </Button>
        </div>
      </div>
    </>
  );
}

export default Mission;
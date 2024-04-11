import React from 'react';
import promoPhoto from './PromoPhoto.jpg';


const Marketing = () => {
  return (
    <>
      {/* Empty section break */}
      <div className="section-break"></div>

      {/* Section with two columns */}
      <div className="two-column-section">
        {/* Left side with an image */}
        <div className="left-column">
          <img src={promoPhoto} alt="Black and White Gym" />
        </div>
        {/* Right side with text */}
        <div className="right-column">
          <h2>Stay Fit, Stay Ahead with B.E.A.T.</h2>
          <p>
            Unlock your full fitness potential with B.E.A.T — Body Exercise and Activity Tracker.<br /> <br />Our cutting-edge platform is designed to empower you to reach your health goals faster and smarter. Whether you're a fitness enthusiast or just starting out, B.E.A.T. offers personalized tracking, insightful analytics, and motivational support to keep you on track every step of the way.
          </p>
        </div>
      </div>
    </>
  );
}

export default Marketing;
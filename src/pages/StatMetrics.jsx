import React from 'react';
import NavigationBar from './components/NavigationBar.jsx';
import Footer from './components/Footer.jsx';
import WorkoutBarChart from './components/WorkoutBarChart.jsx'
const StatMetrics = () => {
    return (
        <div>            
            <NavigationBar />
            <WorkoutBarChart/>
            <Footer />   
        </div>  
    );
};

export default StatMetrics;

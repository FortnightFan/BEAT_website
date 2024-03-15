
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import React from 'react';
import Workout from './components/Workout';


const WorkoutsSelector = () => {
    return (
        <div>
            <NavigationBar />
            <Workout />
            <Footer />
        </div>
    );
};

export default WorkoutsSelector;

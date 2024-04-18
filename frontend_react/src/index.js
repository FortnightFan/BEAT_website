import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css';
import AllExercises from './pages/AllExercises.jsx';
import BodyDataForm from './pages/BodyData.jsx';
import Home from './pages/Home';
import PrevWorkouts from './pages/PrevWorkouts.jsx';
import Profile from './pages/Profile.jsx';
import RoutineSelector from './pages/RoutineSelector.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import StrengthTrainingPage from './pages/StrengthTraining.jsx';
import WorkoutCategories from './pages/WorkoutCategories.jsx';
import WorkoutSelector from './pages/WorkoutSelector.jsx';
import reportWebVitals from './reportWebVitals';
import CreateWorkoutList from './pages/components/CreateWorkoutList.jsx';
import Footer from './pages/components/Footer';
import NavigationBar from './pages/components/NavigationBar';
import WorkoutAdder from './pages/WorkoutAdder.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <CssBaseline /> {/* Ensures a consistent baseline across browsers */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>
        <NavigationBar/>
        <Box component="main" sx={{ flex: 1, overflowY: 'auto' }}> {/* Allows content to grow and footer to stick at the bottom */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/bodydata" element={<BodyDataForm />} />
            <Route path="/profile/prevworkouts" element={<PrevWorkouts />} />
            <Route path="/routineselector" element={<RoutineSelector />} />      
            <Route path="/routine/:routineId" element={<WorkoutSelector />} />
            <Route path="/workout/:workoutID" element={<CreateWorkoutList />} />
            <Route path="/workout/:workoutID/start" element={<WorkoutAdder />} />
          </Routes>
        </Box>
        <Footer/>
      </Box>
    </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

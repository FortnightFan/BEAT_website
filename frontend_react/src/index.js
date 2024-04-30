import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import './index.css';
import BodyDataForm from './pages/BodyData.jsx';
import ExerciseList from './pages/ExerciseList.jsx';
import Home from './pages/Home';
import PrevWorkouts from './pages/PrevWorkouts.jsx';
import Profile from './pages/Profile.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import CheckSession from './pages/components/CheckSession';
import CreateWorkoutList from './pages/components/CreateWorkoutList.jsx';
import Footer from './pages/components/Footer';
import NavigationBar from './pages/components/NavigationBar';
import ThemeProvider from './pages/components/theme-context.jsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <AuthProvider>
      <CheckSession />
      <ThemeProvider>
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
              <Route path="/workout/:workoutID" element={<CreateWorkoutList />} />
              <Route path="/workout/:workoutID/start" element={<ExerciseList />} />
              <Route path="/profile/ExerciseList" element={<ExerciseList />} />
            </Routes>
          </Box>
          <Footer/>
        </Box>
        </ThemeProvider>
      </AuthProvider>
    </Router>
)

reportWebVitals();

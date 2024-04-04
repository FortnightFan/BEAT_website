import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './pages/Home'
import PrevWorkouts from './pages/PrevWorkouts.jsx'
import Profile from './pages/Profile.jsx'
import RoutineSelector from './pages/RoutineSelector.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import StrengthTrainingPage from './pages/StrengthTraining.jsx'
import WorkoutCategories from './pages/WorkoutCategories.jsx'
import WorkoutSelector from './pages/WorkoutSelector.jsx'
import AllExercises from  './pages/AllExercises.jsx'
import BodyDataForm from './pages/BodyData.jsx'

import Footer from './pages/components/Footer'
import NavigationBar from './pages/components/NavigationBar';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/bodydata" element={<BodyDataForm />} />
        <Route path="/profile/prevworkouts" element={<PrevWorkouts />} />
        <Route path="/routineselector" element={<RoutineSelector />} />      
      </Routes>
      <Footer/>
    </Router>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

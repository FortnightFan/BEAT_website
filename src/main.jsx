import React from 'react'
import ReactDOM from 'react-dom/client'
import BodyDataForm from './pages/BodyData.jsx'
import CustomWorkout from './pages/CustomWorkout.jsx'
import ExerciseTracker from './pages/ExerciseTracker.jsx'
import Home from './pages/Home.jsx'
import PrevWorkouts from './pages/PrevWorkouts.jsx'
import Profile from './pages/Profile.jsx'
import RoutineSelector from './pages/RoutineSelector.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import StrengthTrainingPage from './pages/StrengthTraining.jsx'
import WorkoutCategories from './pages/WorkoutCategories.jsx'
import WorkoutSelector from './pages/WorkoutSelector.jsx'
import AllExercises from  './pages/AllExercises.jsx'
import NavigationBar from './pages/components/NavigationBar.jsx'
import Footer from './pages/components/Footer.jsx'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/bodydata" element={<BodyDataForm />} />
        <Route path="/profile/prevworkouts" element={<PrevWorkouts />} />
        <Route path="/routineselector" element={<RoutineSelector />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>,
)

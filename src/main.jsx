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
import StatMetrics from './pages/StatMetrics.jsx'
import StrengthTrainingPage from './pages/StrengthTraining.jsx'
import WorkoutCategories from './pages/WorkoutCategories.jsx'
import WorkoutSelector from './pages/WorkoutSelector.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
    <SignIn />
    <SignUp />
    <Profile />
    <BodyDataForm />
    <RoutineSelector />
    <WorkoutSelector />
    <WorkoutCategories />
    <PrevWorkouts />
    <StatMetrics />
    <StrengthTrainingPage />
    <CustomWorkout />
    <AllExercises />
    <ExerciseTracker />
  </React.StrictMode>,
)

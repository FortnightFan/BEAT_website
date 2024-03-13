import React from 'react'
import ReactDOM from 'react-dom/client'
import BodyDataForm from './pages/BodyData.jsx'
import Home from './pages/Home.jsx'
import RoutineSelector from './pages/RoutineSelector.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import PrevWorkouts from './pages/PrevWorkouts.jsx'
import StatMetrics from './pages/StatMetrics.jsx'
import Profile from './pages/Profile.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
    <SignIn />
    <SignUp />
    <Profile />
    <BodyDataForm />
    <RoutineSelector />
    <PrevWorkouts/>
    <StatMetrics/>
  </React.StrictMode>,
)

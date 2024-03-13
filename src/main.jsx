import React from 'react'
import ReactDOM from 'react-dom/client'
import BodyDataForm from './pages/BodyData.jsx'
import Home from './pages/Home.jsx'
import RoutineSelector from './pages/RoutineSelector.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
    <SignIn />
    <SignUp />
    <BodyDataForm />
    <RoutineSelector />
  </React.StrictMode>,
)

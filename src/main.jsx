import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
    <SignIn />
    <SignUp />
  </React.StrictMode>,
)

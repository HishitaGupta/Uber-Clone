import React from 'react'
import { Route, Routes } from 'react-router'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'

const App = () => {
  return (
   <>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<UserLogin />} />
    <Route path="/signup" element={<UserSignUp/>} />
    <Route path="/captain-login" element={<CaptainLogin/>} />
    <Route path="/captain-signup" element={<CaptainSignup/>} />
   </Routes>
   </>
  )
}

export default App
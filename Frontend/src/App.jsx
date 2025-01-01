import React from 'react'
import { Route, Routes } from 'react-router'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import Start from './pages/Start'
import UserProtected from './pages/UserProtected'
import UserLogout from './pages/UserLogout'
import CaptainLogout from './pages/CaptainLogout'

const App = () => {
  return (
   <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/home" element={<UserProtected><Home /></UserProtected>} />
        <Route path="/user/logout" element={<UserProtected><UserLogout /></UserProtected>} />
        <Route path="/captain/logout" element={<UserProtected><CaptainLogout /></UserProtected>} />
        </Routes>
   </>
      )
}

      export default App
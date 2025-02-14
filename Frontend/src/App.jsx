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
import CaptainHome from './pages/CaptainHome'
import CaptainProtected from './pages/CaptainProtector'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

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
        <Route path="/riding" element={<UserProtected><Riding /></UserProtected>} />
        <Route path="/user/logout" element={<UserProtected><UserLogout /></UserProtected>} />
        <Route path="/captain/logout" element={<UserProtected><CaptainLogout /></UserProtected>} />
        <Route path="/captain-home" element={<CaptainProtected><CaptainHome /></CaptainProtected>} />
        <Route path="/captain-riding" element={<CaptainProtected><CaptainRiding /></CaptainProtected>} />
        </Routes>
   </>
      )
}

      export default App
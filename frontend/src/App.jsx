import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import LandingPage from './Components/LandingPage'
import Footer from './Components/Footer'
import Login from './Pages/auth/Login'
import Registry from './Pages/auth/Registry'
import Home from './Pages/User/Home'
import Templates from './Pages/User/Templates'   
import Profile from './Pages/User/Profile'
import React from 'react'
import MyEvent from './Pages/User/MyEvents'
import Traking from './Pages/User/Traking'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/home" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mis-eventos" element={<MyEvent />} />
        <Route path="/traking" element={<Traking />} />
        {/* otras rutas  */}
      </Routes>
      <Footer />
    </>
  )
}

export default App

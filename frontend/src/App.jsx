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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registry" element={<Registry />} />
        {/* otras rutas  */}
      </Routes>
      <Footer />
    </>
  )
}

export default App

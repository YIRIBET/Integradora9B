import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LandingPage from './Components/LandingPage'
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* otras rutas  */}
      </Routes>
      <Footer /> 
    </>
  );
}

export default App

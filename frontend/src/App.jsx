import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import LandingPage from './Components/LandingPage'
import Footer from './Components/Footer'
import Login from './Pages/auth/Login'
import Registry from './Pages/auth/Registry'
import Templates from './Pages/User/Templates'
import Profile from './Pages/User/Profile'
import MyEvent from './Pages/User/MyEvents'
import Traking from './Pages/User/Traking'
import UserManagement from './Pages/admin/UserManagement'
import TemplateManagement from './Pages/admin/TemplateManagement'
import Home from './Pages/user/Home'
import AdminHome from './Pages/admin/Home'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/home" element={<Home />} />
        <Route path="/templates/:id" element={<Templates />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mis-eventos" element={<MyEvent />} />
        <Route path="/traking" element={<Traking />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route
          path="/admin/template-management"
          element={<TemplateManagement />}
        />
        <Route path="/admin/home" element={<AdminHome />} />
        {/* otras rutas  */}
      </Routes>
      <Footer />
    </>
  )
}

export default App

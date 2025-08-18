import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import ResetPassword from './Components/ResetPassword'
import { AuthProvider } from './Context/AuthContext'
import Confirm from './Pages/User/Confirm_invitation'

// Componente para obtener el role desde el token
function getRoleFromToken() {
  const token = localStorage.getItem('token')
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const payload = JSON.parse(atob(parts[1]))
    return payload.role
  } catch {
    return null
  }
}

// Ruta privada para usuarios con role "user"
function PrivateRoute({ children }) {
  const role = getRoleFromToken()
  if (role === 'user') {
    return children
  }
  return <Navigate to="/login" replace />
}

// Ruta privada para admin
function AdminRoute({ children }) {
  const role = getRoleFromToken()
  if (role === 'admin') {
    return children
  }
  return <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registry" element={<Registry />} />

        {/* Rutas privadas para usuario */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/templates/:id"
          element={
            <PrivateRoute>
              <Templates />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/mis-eventos"
          element={
            <PrivateRoute>
              <MyEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/traking/:invitationId"
          element={
            <PrivateRoute>
              <Traking />
            </PrivateRoute>
          }
        />
        <Route path="confirm-invitation/:uuId" element={<Confirm />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Rutas privadas para admin */}
        <Route
          path="/admin/user-management"
          element={
            <AdminRoute>
              <UserManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/template-management"
          element={
            <AdminRoute>
              <TemplateManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/home"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <AdminRoute>
              <Profile />
            </AdminRoute>
          }
        />
        {/* otras rutas  */}
      </Routes>
      <Footer />
    </AuthProvider>
  )
}

export default App

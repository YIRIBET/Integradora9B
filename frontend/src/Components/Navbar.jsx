import React, { useState, useContext, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import Logo from '../assets/LogoHACETS.png'

// Función para obtener el role del token
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

// Función para obtener información del usuario del localStorage
function getUserInfo() {
  try {
    const token = localStorage.getItem('token')  
    // Si no hay userInfo pero sí token, intentar extraer del token
    if (token) {
      const parts = token.split('.')
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]))
        return {
          name: payload.name || payload.username || 'Usuario',
          email: payload.email || 'user@hacets.com'
        }
      }
    }
    
    return {
      name: 'Usuario HACETS',
      email: 'user@hacets.com'
    }
  } catch {
    return {
      name: 'Usuario HACETS',
      email: 'user@hacets.com'
    }
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { role, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const userMenuRef = useRef(null)
  
  // Obtener información del usuario
  const userInfo = getUserInfo()

  // Cerrar el menú del usuario al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('role')
    
    // Si existe la función logout del contexto, llamarla
    if (logout) {
      logout()
    }
    
    // Cerrar el menú
    setIsUserMenuOpen(false)
    
    // Redirigir al login
    navigate('/login')
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={Logo}
            alt="HACETS Logo"
            className="h-8 w-8"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            HACETS
          </span>
        </Link>

        {/* User menu and mobile menu button */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* User dropdown menu - solo se muestra si hay rol */}
          {(role === 'user' || role === 'admin') && (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isUserMenuOpen}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://randomuser.me/api/portraits/women/45.jpg"
                  alt="user photo"
                />
              </button>

              {/* Dropdown menu */}
              <div
                className={`z-50 ${isUserMenuOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600`}
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{userInfo.name}</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{userInfo.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  {role === 'user' && (
                    <>
                      <li>
                        <Link
                          to="/home"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Perfil
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/mis-eventos"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Mis Eventos
                        </Link>
                      </li>
                    </>
                  )}
                  {role === 'admin' && (
                    <>
                      <li>
                        <Link
                          to="/admin/home"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Perfil
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/user-management"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Usuarios
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/template-management"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Plantillas
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Menu items */}
        <div
          className={`w-full md:block md:w-auto ${isOpen ? 'block' : 'hidden'}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {/* Rutas públicas para todos */}
            <li>
              <Link
                to="/"
                className="block py-3 px-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Inicio
              </Link>
            </li>
            {!role && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-3 px-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link
                    to="/registry"
                    className="block py-3 px-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Registro
                  </Link>
                </li>
              </>
            )}
            {/* Rutas para usuario */}
            {role === 'user' && (
              <>
                <li>
                  <Link
                    to="/home"
                    className="block py-3 px-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Plantillas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mis-eventos"
                    className="block py-3 px-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Mis Eventos
                  </Link>
                </li>
              </>
            )}
            {/* Rutas para admin */}
            {role === 'admin' && (
              <>
                <li>
                  <Link
                    to="/admin/home"
                    className="block py-3 px-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Estadisticas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/user-management"
                    className="block py-3 px-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Usuarios
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/template-management"
                    className="block py-3 px-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Plantillas
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
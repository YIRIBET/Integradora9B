// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    // Aquí deberías agregar la lógica para autenticar al usuario
    console.log('Email:', email, 'Password:', password)
    navigate('/dashboard') // Redirige si es exitoso
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-pink-500 text-center mb-4">
          Bienvenido de nuevo
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Inicia sesión para crear tus invitaciones digitales
        </p>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700">Correo electrónico</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full transition-all duration-300"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500 text-sm">
          ¿No tienes una cuenta?{' '}
          <a
            href="/register"
            className="text-pink-500 hover:underline font-medium"
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login

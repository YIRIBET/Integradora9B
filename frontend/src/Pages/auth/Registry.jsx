// src/pages/RegisterPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Registry() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // Aquí debes enviar los datos a tu API
    console.log('Datos enviados:', form)
    navigate('/login')
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-pink-500 text-center mb-4">
          Crear una cuenta
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Únete y empieza a crear invitaciones increíbles
        </p>
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-gray-700">Apellido</label>
              <input
                type="text"
                name="apellido"
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Tu apellido"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Correo electrónico</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full transition-all duration-300"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500 text-sm">
          ¿Ya tienes cuenta?{' '}
          <a
            href="/login"
            className="text-pink-500 hover:underline font-medium"
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  )
}

export default Registry

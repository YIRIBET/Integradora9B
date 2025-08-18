import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const API_BASE_URL = 'http://localhost:3000/api';

function Registry() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    role: 'user'
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (response.ok) {
        await Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente',
          icon: 'success',
          confirmButtonText: 'Ir a login',
          confirmButtonColor: '#ec4899',
          timer: 3000,
          
          willClose: () => {
            navigate('/login')
          }
        })
      } else {
        let errorMessage = data.message || 'Error al registrar usuario'
        
        // Manejo específico para errores de email duplicado
        if (data.error?.includes('duplicate key error') || data.error?.includes('E11000')) {
          errorMessage = 'El correo electrónico ya está registrado'
        }

        await Swal.fire({
          title: 'Error en el registro',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#ec4899'
        })
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#ec4899'
      })
      console.error('Error de red o servidor:', error)
    } finally {
      setIsLoading(false)
    }
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
              minLength="6"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full transition-all duration-300 flex justify-center items-center ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </>
            ) : (
              'Registrarse'
            )}
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
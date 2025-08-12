import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2' // Importar SweetAlert
import { AuthContext } from '../../Context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Estado para manejar carga
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true) // Activar estado de carga

    fetch('http://localhost:3000/api/auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Login failed')
        return res.json()
      })
      .then((data) => {
        // Guardar el token si lo recibes
        localStorage.setItem('token', data.token)
        login(data.token) // Actualiza el contexto

        // Decodificar el token JWT para obtener el role
        const tokenParts = data.token.split('.')
        if (tokenParts.length === 3) {
          try {
            const payload = JSON.parse(atob(tokenParts[1]))
            const role = payload.role
            //Obten el id y guardalo en el localstorage
            const userId = payload.id_user
            localStorage.setItem('userId', userId)

            // Mostrar alerta de éxito
            Swal.fire({
              title: '¡Bienvenido!',
              text: 'Has iniciado sesión correctamente',
              icon: 'success',
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#ec4899',
              timer: 2000,
            }).then(() => {
              if (role === 'admin') {
                navigate('/admin/home')
              } else {
                navigate('/home')
              }
            })
          } catch (err) {
            // Si falla la decodificación, ir a /home por defecto
            navigate('/home')
          }
        } else {
          // Si el token no tiene el formato esperado, ir a /home por defecto
          navigate('/home')
        }
      })
      .catch((err) => {
        // Mostrar alerta de error
        Swal.fire({
          title: 'Error',
          text: 'Correo o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#ec4899',
        })
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false) // Desactivar estado de carga
      })
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
            disabled={isLoading} // Deshabilitar botón durante carga
            className={`w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full transition-all duration-300 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500 text-sm">
          ¿No tienes una cuenta?{' '}
          <a
            href="/registry"
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

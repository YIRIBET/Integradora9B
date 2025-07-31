import React, { useState, useEffect } from 'react'
// Importa SweetAlert
import Swal from 'sweetalert2'

const UserRegisterModal = ({ open, onClose, onUserSaved, user }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    role: 'user',
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        email: user.email || '',
        password: '',
        role: user.role || 'user',
      })
    } else {
      setForm({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        role: 'user',
      })
    }
  }, [user, open])

  if (!open) return null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Confirmación con SweetAlert
    const result = await Swal.fire({
      title: user ? '¿Guardar cambios?' : '¿Registrar usuario?',
      text: user
        ? '¿Estás seguro de que deseas guardar los cambios de este usuario?'
        : '¿Estás seguro de que deseas registrar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ec4899',
      cancelButtonColor: '#aaa',
      confirmButtonText: user ? 'Guardar' : 'Registrar',
      cancelButtonText: 'Cancelar',
    })
    if (!result.isConfirmed) return

    setIsLoading(true)
    try {
      let response
      if (user) {
        // Edición SIN enviar password
        const { password, email, role, ...formWithoutPassword } = form
        response = await fetch(
          `http://localhost:3000/api/users/${user.id_user}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formWithoutPassword),
          }
        )
      } else {
        // Registro
        response = await fetch('http://localhost:3000/api/users/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      if (response.ok) {
        setForm({
          nombre: '',
          apellido: '',
          email: '',
          password: '',
          role: 'user',
        })
        if (onUserSaved)
          onUserSaved(
            user
              ? 'Usuario actualizado correctamente'
              : 'Usuario registrado correctamente'
          )
      } else {
        const data = await response.json()
        let errorMessage = data.message || 'Error al guardar usuario'
        if (
          data.error?.includes('duplicate key error') ||
          data.error?.includes('E11000')
        ) {
          errorMessage = 'El correo electrónico ya está registrado'
        }
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          confirmButtonColor: '#ec4899',
        })
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error de red o servidor',
        confirmButtonColor: '#ec4899',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-contrast-50 ">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative border border-pink-200">
        <button
          className="absolute top-3 right-3 text-pink-400 hover:text-pink-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-pink-500 text-center mb-4">
          {user ? 'Editar usuario' : 'Crear usuario'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                required
                className="w-full mt-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                className="w-full mt-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
              className="w-full mt-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@example.com"
              disabled={!!user}
            />
          </div>
          {/* Solo mostrar contraseña si es registro */}
          {!user && (
            <div>
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                required
                minLength="6"
                className="w-full mt-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700">Rol</label>
            <select
              name="role"
              className="w-full mt-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={form.role}
              onChange={handleChange}
              disabled={!!user}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-full transition-all duration-300"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-1/2 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full transition-all duration-300 flex justify-center items-center ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Procesando...
                </>
              ) : user ? (
                'Guardar cambios'
              ) : (
                'Registrar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserRegisterModal

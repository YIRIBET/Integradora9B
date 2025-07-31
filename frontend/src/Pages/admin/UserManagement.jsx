import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
// Importa el modal de registro
import UserRegisterModal from '../../Components/admin/UserRegisterModal'
// Importa SweetAlert
import Swal from 'sweetalert2'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch users from the API
    axios
      .get('http://localhost:3000/api/users/')
      .then((response) => {
        setUsers(response.data.data) // Adapt to the API response structure
        console.log('Usuarios obtenidos:', response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  // Filtrado simple por nombre, apellido o email
  const filteredUsers = users.filter(
    (user) =>
      user.nombre.toLowerCase().includes(search.toLowerCase()) ||
      user.apellido.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  )

  // Handler para abrir modal en modo edición
  const handleEdit = (user) => {
    setEditUser(user)
    setShowModal(true)
  }

  // Handler para cerrar modal y limpiar estado de edición
  const handleCloseModal = () => {
    setShowModal(false)
    setEditUser(null)
  }

  // Handler para refrescar usuarios después de crear/editar
  const handleUserSaved = (msg) => {
    setShowModal(false)
    setEditUser(null)
    axios.get('http://localhost:3000/api/users/').then((res) => {
      setUsers(res.data.data)
      if (msg) {
        Swal.fire({
          icon: 'success',
          title: msg,
          confirmButtonColor: '#ec4899',
          timer: 2000,
        })
      }
    })
  }

  // Handler para desactivar usuario
  const handleDeactivate = async (user) => {
    const result = await Swal.fire({
      title: `¿Desactivar usuario?`,
      text: `¿Seguro que deseas desactivar a ${user.nombre} ${user.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec4899',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
    })
    if (!result.isConfirmed) return
    try {
      await axios.put(`http://localhost:3000/api/users/${user.id_user}`, {
        status: 0,
      })
      // Refresca la lista de usuarios
      const res = await axios.get('http://localhost:3000/api/users/')
      setUsers(res.data.data)
      Swal.fire({
        icon: 'success',
        title: 'Usuario desactivado',
        confirmButtonColor: '#ec4899',
        timer: 2000,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al desactivar usuario',
        confirmButtonColor: '#ec4899',
      })
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 via-blue-50 to-white min-h-screen">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-pink-500 mb-1">Usuarios</h1>
          <p className="text-blue-500">
            Administra las cuentas y permisos de los usuarios.
          </p>
        </div>
        <button
          className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-6 py-2 rounded shadow-md font-semibold transition"
          onClick={() => {
            setShowModal(true)
            setEditUser(null)
          }}
        >
          + Agregar usuario
        </button>
      </div>

      {/* Modal de registro/edición */}
      <UserRegisterModal
        open={showModal}
        onClose={handleCloseModal}
        onUserSaved={handleUserSaved}
        user={editUser}
      />

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow-lg p-0 overflow-x-auto border border-pink-100">
        {/* Barra superior de tabla */}
        <div className="flex items-center justify-between px-6 py-4 rounded-t-lg bg-gradient-to-r from-pink-100 to-blue-100 border-b border-pink-200">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-pink-400">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-pink-200 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400 text-blue-800 pl-10 bg-pink-50 placeholder-pink-300"
              style={{ minWidth: 220 }}
            />
          </div>
        </div>
        {/* Tabla */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-100 to-blue-100">
              <th className="border-b border-pink-200 p-4 text-left text-pink-500 font-semibold">
                Usuario
              </th>
              <th className="border-b border-pink-200 p-4 text-left text-pink-500 font-semibold">
                Rol
              </th>
              <th className="border-b border-pink-200 p-4 text-left text-pink-500 font-semibold">
                Estado
              </th>
              <th className="border-b border-pink-200 p-4 text-center text-pink-500 font-semibold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-blue-300 py-8">
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
            {filteredUsers.map((user, idx) => (
              <tr
                key={user.id_user}
                className={
                  idx % 2 === 0
                    ? 'bg-white'
                    : 'bg-gradient-to-r from-pink-50 to-blue-50'
                }
              >
                <td className="p-4 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-lg font-bold uppercase shadow">
                    {user.nombre.charAt(0)}
                    {user.apellido.charAt(0)}
                  </div>
                  <div>
                    <p className="text-blue-800 font-medium">{`${user.nombre} ${user.apellido}`}</p>
                    <p className="text-pink-400 text-sm">{user.email}</p>
                  </div>
                </td>
                <td className="p-4 text-blue-700">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      user.status === 1
                        ? 'bg-gradient-to-r from-pink-500 to-blue-500'
                        : 'bg-gray-400'
                    }`}
                  >
                    {user.status === 1 ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    className="text-blue-500 hover:text-pink-500 mx-1 transition"
                    title="Editar"
                    onClick={() => handleEdit(user)}
                  >
                    <PencilSquareIcon className="inline w-5 h-5" />
                  </button>
                  <button
                    className="text-pink-500 hover:text-blue-500 mx-1 transition"
                    title="Eliminar"
                    onClick={() => handleDeactivate(user)}
                  >
                    <TrashIcon className="inline w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement

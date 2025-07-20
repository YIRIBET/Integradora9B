import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserManagement = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch users from the API
    axios
      .get('http://localhost:3000/api/users/')
      .then((response) => {
        setUsers(response.data.data) // Adapt to the API response structure
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Users Management
      </h1>
      <p className="mb-6 text-gray-600">
        Manage user accounts and monitor platform usage.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mb-6 shadow-md">
        Add User
      </button>
      <div className="bg-white border rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          className="border border-gray-300 p-3 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <table className="w-full border-collapse">
          <thead>
            <tr className="">
              <th className="border p-4 text-left text-gray-600">User</th>
              <th className="border p-4 text-left text-gray-600">Role</th>
              <th className="border p-4 text-left text-gray-600">Status</th>
              <th className="border p-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_user} className="hover:bg-gray-50">
                <td className="border p-4 flex items-center">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                    {user.nombre.charAt(0)}
                    {user.apellido.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">{`${user.nombre} ${user.apellido}`}</p>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                  </div>
                </td>
                <td className="border p-4 text-gray-800">{user.role}</td>
                <td className="border p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      user.status === 1 ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  >
                    {user.status === 1 ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="border p-4 text-gray-800">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement

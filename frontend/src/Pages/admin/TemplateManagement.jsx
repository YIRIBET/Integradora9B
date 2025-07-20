import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TemplateManagement = () => {
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    // Fetch templates from the API
    axios
      .get('http://localhost:3000/api/templates')
      .then((response) => {
        setTemplates(response.data) // Adapt to the API response structure
      })
      .catch((error) => {
        console.error('Error fetching templates:', error)
      })
  }, [])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Template Management
      </h1>
      <p className="mb-6 text-gray-600">
        Manage templates and monitor their usage.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mb-6 shadow-md">
        Add Template
      </button>
      <div className="bg-white border rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          All Templates
        </h2>
        <input
          type="text"
          placeholder="Search templates..."
          className="border border-gray-300 p-3 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-4 text-left text-gray-600">Name</th>
              <th className="border p-4 text-left text-gray-600">
                Description
              </th>
              <th className="border p-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template.id} className="hover:bg-gray-50">
                <td className="border p-4 text-gray-800">{template.name}</td>
                <td className="border p-4 text-gray-800">
                  {template.description}
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

export default TemplateManagement

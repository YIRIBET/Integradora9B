import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import TemplateModal from '../../Components/admin/TemplateModal'

const TemplateManagement = () => {
  const [templates, setTemplates] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editTemplate, setEditTemplate] = useState(null)

  useEffect(() => {
    fetchTemplates()
  }, [])
  console.log('TemplateManagement:', templates)

  const fetchTemplates = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/templates')
      setTemplates(res.data.data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener plantillas',
        confirmButtonColor: '#ec4899',
      })
    }
  }

  const handleTemplateSaved = (msg) => {
    setShowModal(false)
    setEditTemplate(null)
    fetchTemplates()
    if (msg) {
      Swal.fire({
        icon: 'success',
        title: msg,
        confirmButtonColor: '#ec4899',
        timer: 2000,
      })
    }
  }

  const handleEdit = (template) => {
    setEditTemplate(template)
    setShowModal(true)
  }

  const handleDeactivate = async (template) => {
    const result = await Swal.fire({
      title:
        template.status === 1
          ? '¿Eliminar plantilla?'
          : '¿Activar plantilla?',
      text:
        template.status === 1
          ? `¿Seguro que deseas eliminar "${template.template_name}"?`
          : `¿Seguro que deseas activar "${template.template_name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec4899',
      cancelButtonColor: '#aaa',
      confirmButtonText: template.status === 1 ? 'Desactivar' : 'Activar',
      cancelButtonText: 'Cancelar',
    })
    if (!result.isConfirmed) return
    try {
      await axios.delete(
        `http://localhost:3000/api/templates/${template.id_templates}`,
        {
          status: template.status === 1 ? 0 : 1,
        }
      )
      fetchTemplates()
      Swal.fire({
        icon: 'success',
        title:
          template.status === 1 ? 'Plantilla eliminada' : 'Plantilla activada',
        confirmButtonColor: '#ec4899',
        timer: 2000,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar plantilla',
        confirmButtonColor: '#ec4899',
      })
    }
  }

  // Filtrado simple por nombre
  const filteredTemplates = templates.filter((t) => {
    const name = t.template_name ? t.template_name : "vacio"
    return name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 via-blue-50 to-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-pink-500 mb-1">Plantillas</h1>
          <p className="text-blue-500">
            Administra las plantillas y su disponibilidad.
          </p>
        </div>
        <button
          className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-6 py-2 rounded shadow-md font-semibold transition flex items-center gap-2"
          onClick={() => {
            setShowModal(true)
            setEditTemplate(null)
          }}
        >
          <PlusIcon className="w-5 h-5" />
          Agregar plantilla
        </button>
      </div>

      {/* Modal */}
      <TemplateModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setEditTemplate(null)
        }}
        onTemplateSaved={handleTemplateSaved}
        template={editTemplate}
      />

      <div className="bg-white rounded-lg shadow-lg p-0 overflow-x-auto border border-pink-100">
        <div className="flex items-center justify-between px-6 py-4 rounded-t-lg bg-gradient-to-r from-pink-100 to-blue-100 border-b border-pink-200">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar plantilla..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-pink-200 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400 text-blue-800 bg-pink-50 placeholder-pink-300"
              style={{ minWidth: 220 }}
            />
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-100 to-blue-100">
              <th className="border-b border-pink-200 p-4 text-left text-pink-500 font-semibold">
                Imagen
              </th>
              <th className="border-b border-pink-200 p-4 text-left text-pink-500 font-semibold">
                Nombre
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
            {filteredTemplates.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-blue-300 py-8">
                  No se encontraron plantillas.
                </td>
              </tr>
            )}
            {filteredTemplates.map((template, idx) => (
              <tr
                key={template.id}
                className={
                  idx % 2 === 0
                    ? 'bg-white'
                    : 'bg-gradient-to-r from-pink-50 to-blue-50'
                }
              >
                <td className="p-4">
                  {template.image ? (
                    <img
                      src={template.image}
                      alt={template.template_name ? template.template_name : "vacio"}
                      className="w-16 h-16 object-cover rounded shadow"
                    />
                  ) : (
                    <span className="text-gray-400">vacio</span>
                  )}
                </td>
                <td className="p-4 text-blue-800 font-medium">
                  {template.template_name ? template.template_name : "vacio"}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      template.status === 1
                        ? 'bg-gradient-to-r from-pink-500 to-blue-500'
                        : 'bg-gray-400'
                    }`}
                  >
                    {template.status === 1 ? 'Activo' : (template.status === 0 ? 'Inactivo' : 'vacio')}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    className="text-blue-500 hover:text-pink-500 mx-1 transition"
                    title="Editar"
                    onClick={() => handleEdit(template)}
                  >
                    <PencilSquareIcon className="inline w-5 h-5" />
                  </button>
                  <button
                    className={`${
                      template.status === 1
                        ? 'text-pink-500 hover:text-blue-500'
                        : 'text-green-500 hover:text-blue-500'
                    } mx-1 transition`}
                    title={template.status === 1 ? 'Desactivar' : 'Activar'}
                    onClick={() => handleDeactivate(template)}
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

export default TemplateManagement

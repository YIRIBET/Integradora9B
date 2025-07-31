import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

const TemplateModal = ({ open, onClose, onTemplateSaved, template }) => {
  const [form, setForm] = useState({
    template_name: '',
    image: null,
    status: 1,
  })
  const [preview, setPreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (template) {
      setForm({
        template_name: template.template_name || '',
        image: null,
        status: template.status ?? 1,
      })
      setPreview(template.image || null)
    } else {
      setForm({
        template_name: '',
        image: null,
        status: 1,
      })
      setPreview(null)
    }
  }, [template, open])

  if (!open) return null

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setForm({ ...form, image: files[0] })
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null)
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await Swal.fire({
      title: template ? '¿Guardar cambios?' : '¿Registrar plantilla?',
      text: template
        ? '¿Estás seguro de que deseas guardar los cambios de esta plantilla?'
        : '¿Estás seguro de que deseas registrar esta plantilla?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ec4899',
      cancelButtonColor: '#aaa',
      confirmButtonText: template ? 'Guardar' : 'Registrar',
      cancelButtonText: 'Cancelar',
    })
    if (!result.isConfirmed) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('template_name', form.template_name)
      if (form.image) formData.append('image', form.image)
      formData.append('status', form.status)
      let response
      if (template) {
        response = await fetch(
          `http://localhost:3000/api/templates/${template.id_templates}`,
          {
            method: 'PUT',
            body: formData,
          }
        )
      } else {
        response = await fetch('http://localhost:3000/api/templates', {
          method: 'POST',
          body: formData,
        })
      }
      if (response.ok) {
        onTemplateSaved(
          template
            ? 'Plantilla actualizada correctamente'
            : 'Plantilla registrada correctamente'
        )
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar plantilla',
          confirmButtonColor: '#ec4899',
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de red o servidor',
        text: error?.message || '',
        confirmButtonColor: '#ec4899',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-contrast-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative border border-pink-200">
        <button
          className="absolute top-3 right-3 text-pink-400 hover:text-pink-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-pink-500 text-center mb-4">
          {template ? 'Editar plantilla' : 'Registrar plantilla'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700">
              Nombre de la plantilla
            </label>
            <input
              type="text"
              name="template_name"
              required
              className="w-full mt-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={form.template_name}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </div>
          <div>
            <label className="block text-gray-700">Imagen</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full mt-1"
              onChange={handleChange}
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-2 rounded shadow max-h-32 object-contain"
              />
            )}
          </div>
          <div>
            <label className="block text-gray-700">Estado</label>
            <select
              name="status"
              className="w-full mt-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={form.status}
              onChange={handleChange}
            >
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
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
              ) : template ? (
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

export default TemplateModal

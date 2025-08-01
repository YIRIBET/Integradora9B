import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function Templates() {
  const [templates, setTemplates] = useState([]);
  const { id } = useParams();
  const [newText, setNewText] = useState('');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontColor, setFontColor] = useState('#000000');
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);
  
  const [invitationData, setInvitationData] = useState({
    address: '',
    scheduled_at: '',
    templates_id_templates: parseInt(id) || 0,
    user_id_user: 1 
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Obtener user_id del localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setInvitationData(prev => ({
        ...prev,
        user_id_user: user.id_user || ''
      }));
    }

    // Cargar plantilla
    fetch(`http://localhost:3000/api/templates/${id}/image`)
      .then((response) => {
        if (!response.ok) throw new Error('Error al cargar plantilla');
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setTemplates(Array.isArray(data.data) ? data.data : [data.data]);
        }
      })
      .catch((error) => {
        console.error('Error al cargar las plantillas:', error);
        setSaveMessage(`Error: ${error.message}`);
      });
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    
    // Validación de dirección
    if (!invitationData.address || invitationData.address.trim() === '') {
      newErrors.address = 'La dirección es requerida';
    }
    
    // Validación de fecha
    if (!invitationData.scheduled_at) {
      newErrors.scheduled_at = 'La fecha y hora son requeridas';
    } else {
      const selectedDate = new Date(invitationData.scheduled_at);
      const currentDate = new Date();
      
      if (selectedDate < currentDate) {
        newErrors.scheduled_at = 'La fecha no puede ser en el pasado';
      }
    }
    
    // Validación de usuario
    if (!invitationData.user_id_user || invitationData.user_id_user === '') {
      newErrors.user = 'Usuario no identificado';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddText = () => {
    if (newText.trim() === '') return;
    setTexts([...texts, {
      value: newText,
      fontFamily,
      color: fontColor,
      x: 50,
      y: 50,
      type: 'text'
    }]);
    setNewText('');
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, {
          src: reader.result,
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          type: 'image'
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (e, index, type) => {
    setDraggingItem({ index, type });
    e.dataTransfer.setData('text/plain', JSON.stringify({ index, type }));
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const containerRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    if (!draggingItem) return;

    if (draggingItem.type === 'text') {
      const newTexts = [...texts];
      newTexts[draggingItem.index] = {
        ...newTexts[draggingItem.index],
        x,
        y
      };
      setTexts(newTexts);
    } else if (draggingItem.type === 'image') {
      const newImages = [...images];
      newImages[draggingItem.index] = {
        ...newImages[draggingItem.index],
        x,
        y
      };
      setImages(newImages);
    }
  };

  const handleInvitationChange = (e) => {
    const { name, value } = e.target;
    setInvitationData({
      ...invitationData,
      [name]: name === 'templates_id_templates' ? parseInt(value) : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const saveInvitation = async () => {
    if (!validateForm()) {
      console.log('Errores de validación:', errors);
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      // Guardar diseño en localStorage
      const designData = {
        texts,
        images,
        fontFamily,
        fontColor,
        templateId: id,
        templateImage: templates[0]?.image,
        invitationDetails: {
          address: invitationData.address,
          date: invitationData.scheduled_at
        },
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('currentDesign', JSON.stringify(designData));

      // Preparar datos para el servidor
      const payload = {
        address: invitationData.address,
        scheduled_at: new Date(invitationData.scheduled_at).toISOString(),
        templates_id_templates: invitationData.templates_id_templates,
        user_id_user: invitationData.user_id_user,
       
      };

      console.log('Enviando datos al servidor:', payload);

      const response = await fetch('http://localhost:3000/api/invitation/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error al guardar la invitación');
      }

      setSaveMessage('¡Invitación guardada correctamente!');
      
      // Resetear campos del formulario
      setInvitationData(prev => ({
        ...prev,
        address: '',
        scheduled_at: ''
      }));

    } catch (error) {
      console.error('Error al guardar:', error);
      setSaveMessage(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vista previa de la plantilla editable */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Vista previa de la invitación</h2>
          <div
            className="relative w-full h-96 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {templates[0] && (
              <img
                src={templates[0].image}
                alt="Plantilla base"
                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
                style={{ zIndex: 0 }}
              />
            )}
            
            {texts.map((text, idx) => (
              <div
                key={`text-${idx}`}
                style={{
                  position: 'absolute',
                  top: `${text.y}px`,
                  left: `${text.x}px`,
                  fontFamily: text.fontFamily,
                  color: text.color,
                  fontSize: '24px',
                  cursor: 'move',
                  zIndex: 2,
                  userSelect: 'none',
                  padding: '4px',
                  backgroundColor: 'rgba(255,255,255,0.7)'
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, idx, 'text')}
                onDragEnd={handleDragEnd}
              >
                {text.value}
              </div>
            ))}
            
            {images.map((img, idx) => (
              <img
                key={`img-${idx}`}
                src={img.src}
                alt="Agregada por el usuario"
                style={{
                  position: 'absolute',
                  top: `${img.y}px`,
                  left: `${img.x}px`,
                  width: `${img.width}px`,
                  height: `${img.height}px`,
                  objectFit: 'contain',
                  cursor: 'move',
                  zIndex: 1,
                  userSelect: 'none',
                  border: '2px dashed #ccc'
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, idx, 'image')}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        </div>

        {/* Panel de herramientas */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Herramientas de diseño</h2>
            
            <div className="space-y-4">
              {/* Agregar texto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agregar texto:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe tu texto aquí"
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={handleAddText}
                  >
                    Agregar
                  </button>
                </div>
              </div>
              
              {/* Configuración de texto */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de letra:</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={fontFamily}
                    onChange={e => setFontFamily(e.target.value)}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Georgia">Georgia</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color de texto:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="h-10 w-10 cursor-pointer"
                      value={fontColor}
                      onChange={e => setFontColor(e.target.value)}
                    />
                    <span className="text-sm">{fontColor}</span>
                  </div>
                </div>
              </div>
              
              {/* Agregar imagen */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agregar imagen:</label>
                <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500">
                  <span className="text-sm text-gray-600">Haz clic para seleccionar una imagen</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAddImage}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Formulario de datos de la invitación */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Datos de la invitación</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección del evento:</label>
                <input
                  type="text"
                  name="address"
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.address ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-500'
                  }`}
                  placeholder="Ej: Av. Principal #123, Ciudad"
                  value={invitationData.address}
                  onChange={handleInvitationChange}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y hora del evento:</label>
                <input
                  type="datetime-local"
                  name="scheduled_at"
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.scheduled_at ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-500'
                  }`}
                  value={invitationData.scheduled_at}
                  onChange={handleInvitationChange}
                />
                {errors.scheduled_at && (
                  <p className="mt-1 text-sm text-red-600">{errors.scheduled_at}</p>
                )}
              </div>
            </div>
          </div>

          {/* Panel de guardado */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <button
              className={`w-full px-4 py-3 rounded-lg font-medium text-white transition-colors ${
                isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
              onClick={saveInvitation}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : 'Guardar Invitación'}
            </button>
            
            
            {saveMessage && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                saveMessage.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {saveMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templates;
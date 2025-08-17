import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import GuestModal from '../../Components/user/GuestModal';
import { toPng } from 'html-to-image';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const { id } = useParams();
  const [newText, setNewText] = useState('');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(24);
  const previewRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guests, setGuests] = useState([]);
  const [invitationId, setInvitationId] = useState(null);

  const [editableElements, setEditableElements] = useState({
    texts: [],
    images: [],
    address: { x: 30, y: 30, fontFamily: 'Arial', color: '#000000', fontSize: 20 },
    date: { x: 30, y: 60, fontFamily: 'Arial', color: '#000000', fontSize: 20 }
  });

  const [invitationData, setInvitationData] = useState({
    address: '',
    scheduled_at: '',
    templates_id_templates: parseInt(id) || 0,
    user_id_user: localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')) : 0,
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setInvitationData(prev => ({
        ...prev,
        user_id_user: user.id_user || '',
      }));
    }

    fetch(`http://localhost:3000/api/templates/${id}/image`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setTemplates(Array.isArray(data.data) ? data.data : [data.data]);
        else Swal.fire('Error', data.message || 'No se encontró la plantilla', 'error');
      })
      .catch(err => Swal.fire('Error', err.message || 'Ocurrió un error', 'error'));

    loadSavedDesign();
  }, [id]);

  const loadSavedDesign = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const response = await fetch(`http://localhost:3000/api/tempInvitation/get/${userId}`);
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        const savedDesign = data.data[0];
        
        if (savedDesign.elements_positions) {
          const { elements } = savedDesign.elements_positions;
          
          const newEditableElements = {
            texts: [],
            images: [],
            address: { x: 30, y: 30, fontFamily: 'Arial', color: '#000000', fontSize: 20 },
            date: { x: 30, y: 60, fontFamily: 'Arial', color: '#000000', fontSize: 20 }
          };

          elements.forEach(element => {
            if (element.type === 'text') {
              if (element.id === 'address') {
                newEditableElements.address = {
                  ...newEditableElements.address,
                  x: element.x,
                  y: element.y,
                  fontFamily: element.fontFamily,
                  color: element.color,
                  fontSize: element.fontSize
                };
                setInvitationData(prev => ({ ...prev, address: element.content }));
              } 
              else if (element.id === 'date') {
                newEditableElements.date = {
                  ...newEditableElements.date,
                  x: element.x,
                  y: element.y,
                  fontFamily: element.fontFamily,
                  color: element.color,
                  fontSize: element.fontSize
                };
              }
              else if (element.id.startsWith('text-')) {
                newEditableElements.texts.push({
                  value: element.content,
                  fontFamily: element.fontFamily,
                  color: element.color,
                  x: element.x,
                  y: element.y,
                  fontSize: element.fontSize
                });
              }
            } 
            else if (element.type === 'image') {
              newEditableElements.images.push({
                src: element.src,
                x: element.x,
                y: element.y,
                width: element.width,
                height: element.height
              });
            }
          });

          setEditableElements(newEditableElements);
        }
      }
    } catch (error) {
      console.error('Error al cargar diseño guardado:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!invitationData.address?.trim()) newErrors.address = 'La dirección es requerida';
    if (!invitationData.scheduled_at) newErrors.scheduled_at = 'La fecha y hora son requeridas';
    else if (new Date(invitationData.scheduled_at) < new Date()) newErrors.scheduled_at = 'La fecha no puede ser en el pasado';
    if (!invitationData.user_id_user) newErrors.user = 'Usuario no identificado';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddText = () => {
    if (!newText.trim()) return;
    setEditableElements(prev => ({
      ...prev,
      texts: [
        ...prev.texts,
        { 
          value: newText, 
          fontFamily, 
          color: fontColor, 
          x: 50, 
          y: 50, 
          fontSize 
        }
      ]
    }));
    setNewText('');
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableElements(prev => ({
          ...prev,
          images: [
            ...prev.images,
            { 
              src: reader.result, 
              x: 50, 
              y: 50, 
              width: 100, 
              height: 100 
            }
          ]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (e, id, type) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ id, type }));
  };

  const handleDragEnd = () => {};

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const containerRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    if (!data) return;

    setEditableElements(prev => {
      const newElements = { ...prev };
      
      if (data.type === 'text') {
        newElements.texts = newElements.texts.map((text, idx) => 
          idx.toString() === data.id ? { ...text, x, y } : text
        );
      } 
      else if (data.type === 'image') {
        newElements.images = newElements.images.map((img, idx) => 
          idx.toString() === data.id ? { ...img, x, y } : img
        );
      }
      else if (data.type === 'address') {
        newElements.address = { ...newElements.address, x, y };
      }
      else if (data.type === 'date') {
        newElements.date = { ...newElements.date, x, y };
      }

      return newElements;
    });
  };

  const handleInvitationChange = (e) => {
    const { name, value } = e.target;
    setInvitationData({ ...invitationData, [name]: name === 'templates_id_templates' ? parseInt(value) : value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };
  const captureInvitationImage = async () => {
    if (!previewRef.current) {
      throw new Error('Elemento de vista previa no encontrado');
    }
    
    try {
      const options = {
        backgroundColor: '#ffffff',
        quality: 1.0,
        pixelRatio: 2,
        width: previewRef.current.offsetWidth,
        height: previewRef.current.offsetHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        },
        cacheBust: true,
        skipAutoScale: false
      };
      
      console.log('Capturando imagen con html-to-image...');
      const dataUrl = await toPng(previewRef.current, options);
      
      if (!dataUrl || dataUrl === 'data:,') {
        throw new Error('La imagen capturada está vacía');
      }
      
      console.log('Imagen capturada exitosamente con html-to-image');
      return dataUrl;
      
    } catch (error) {
      console.warn('Error con html-to-image:', error.message);
      console.log('Intentando fallback con canvas nativo...');
      
      return await captureWithCanvas();
    }
  };

  const captureWithCanvas = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const previewElement = previewRef.current;
    
    if (!previewElement) {
      throw new Error('Elemento de vista previa no encontrado para canvas');
    }
    
    const scale = 2;
    canvas.width = previewElement.offsetWidth * scale;
    canvas.height = previewElement.offsetHeight * scale;
    ctx.scale(scale, scale);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, previewElement.offsetWidth, previewElement.offsetHeight);
    
    if (templates[0]) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      return new Promise((resolve, reject) => {
        img.onload = () => {
          try {

            ctx.drawImage(img, 0, 0, previewElement.offsetWidth, previewElement.offsetHeight);

            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            
            if (invitationData.address) {
              ctx.fillStyle = editableElements.address.color;
              ctx.font = `${editableElements.address.fontSize}px ${editableElements.address.fontFamily}`;
              const addressLines = wrapText(ctx, invitationData.address, previewElement.offsetWidth - editableElements.address.x - 20);
              addressLines.forEach((line, index) => {
                ctx.fillText(line, editableElements.address.x, editableElements.address.y + (index * editableElements.address.fontSize * 1.2));
              });
            }
            if (invitationData.scheduled_at) {
              const dateText = new Date(invitationData.scheduled_at).toLocaleString('es-MX', {
                dateStyle: 'medium',
                timeStyle: 'short',
              });
              ctx.fillStyle = editableElements.date.color;
              ctx.font = `${editableElements.date.fontSize}px ${editableElements.date.fontFamily}`;
              ctx.fillText(dateText, editableElements.date.x, editableElements.date.y);
            }

            editableElements.texts.forEach(text => {
              ctx.fillStyle = text.color;
              ctx.font = `${text.fontSize}px ${text.fontFamily}`;
              const textLines = wrapText(ctx, text.value, previewElement.offsetWidth - text.x - 20);
              textLines.forEach((line, index) => {
                ctx.fillText(line, text.x, text.y + (index * text.fontSize * 1.2));
              });
            });
            
            console.log('Imagen capturada exitosamente con canvas nativo');
            resolve(canvas.toDataURL('image/png', 1.0));
            
          } catch (drawError) {
            console.error('Error al dibujar en canvas:', drawError);
            reject(drawError);
          }
        };
        
        img.onerror = (imgError) => {
          console.error('Error al cargar imagen base:', imgError);
          reject(new Error('No se pudo cargar la imagen de la plantilla'));
        };
        
        img.src = templates[0].image;
      });
    }
    
    console.log('Canvas sin imagen base creado');
    return canvas.toDataURL('image/png', 1.0);
  };

  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (let word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  };

  const prepareElementsData = () => {
    return {
      elements: [
        {
          id: 'address',
          type: 'text',
          x: editableElements.address.x,
          y: editableElements.address.y,
          content: invitationData.address,
          fontFamily: editableElements.address.fontFamily,
          color: editableElements.address.color,
          fontSize: editableElements.address.fontSize
        },
        {
          id: 'date',
          type: 'text',
          x: editableElements.date.x,
          y: editableElements.date.y,
          content: new Date(invitationData.scheduled_at).toLocaleString('es-MX', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
          fontFamily: editableElements.date.fontFamily,
          color: editableElements.date.color,
          fontSize: editableElements.date.fontSize
        },
        ...editableElements.texts.map((text, idx) => ({
          id: `text-${idx}`,
          type: 'text',
          x: text.x,
          y: text.y,
          content: text.value,
          fontFamily: text.fontFamily,
          color: text.color,
          fontSize: text.fontSize
        })),
        ...editableElements.images.map((img, idx) => ({
          id: `img-${idx}`,
          type: 'image',
          x: img.x,
          y: img.y,
          width: img.width,
          height: img.height,
          src: img.src
        }))
      ]
    };
  };

  const saveImageToTempFolder = async (invitationId, userId) => {
    try {
      console.log('Iniciando captura y guardado de imagen...');

      const imageDataUrl = await captureInvitationImage();
      
      if (!imageDataUrl || imageDataUrl === 'data:,') {
        throw new Error('No se pudo capturar la imagen de la vista previa');
      }

      const response = await fetch(imageDataUrl);
      const blob = await response.blob();

      const elementsData = prepareElementsData();

      const formData = new FormData();
      formData.append('image', blob, `invitation_${invitationId}_${Date.now()}.png`);
      formData.append('user_id', userId.toString());
      formData.append('invitation_id', invitationId.toString());
      formData.append('elements_positions', JSON.stringify(elementsData));

      console.log('Enviando imagen al servidor...');
      
      const res = await fetch('http://localhost:3000/api/tempInvitation/save', {
        method: 'POST',
        body: formData,
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Error al guardar la imagen en el servidor');
      }
      
      console.log('Imagen guardada exitosamente', data.data);
      return data.data;
      
    } catch (error) {
      console.error('Error al guardar imagen:', error);
      throw error;
    }
  };
  const saveInvitation = async () => {
    if (!validateForm()) {
      const msgs = Object.values(errors).filter(msg => msg).join('<br>');
      if (msgs) Swal.fire('Error de Validación', msgs, 'error');
      return;
    }

    setIsSaving(true);
    
    try {
      console.log('Iniciando proceso de guardado...');
    
      const invitationPayload = {
        address: invitationData.address,
        scheduled_at: new Date(invitationData.scheduled_at).toISOString(),
        templates_id_templates: invitationData.templates_id_templates,
        user_id_user: invitationData.user_id_user,
      };

      console.log('Guardando evento en base de datos...');
      
      const res = await fetch('http://localhost:3000/api/invitation/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${localStorage.getItem('token') || ''}` 
        },
        body: JSON.stringify(invitationPayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al guardar la invitación');

      const savedInvitationId = data.data.id_invitation || null;
      if (!savedInvitationId) {
        throw new Error('No se obtuvo el ID de la invitación guardada');
      }
      
      console.log('Evento guardado con ID:', savedInvitationId);
      setInvitationId(savedInvitationId);
      console.log('Guardando imagen ');
      await saveImageToTempFolder(savedInvitationId, invitationData.user_id_user);

      Swal.fire({
        title: '¡Éxito!',
        text: 'Evento e imagen guardados correctamente. ¿Deseas agregar invitados ahora?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Sí, agregar invitados',
        cancelButtonText: 'No, más tarde',
      }).then((result) => {
        if (result.isConfirmed) {
          setShowGuestModal(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Opción: redirigir o limpiar formulario
          window.location.href = `/mis-eventos`;
        }
      });

      // 4. Limpiar el formulario
      setInvitationData({ 
        ...invitationData, 
        address: '', 
        scheduled_at: '' 
      });
      
      setEditableElements({
        texts: [],
        images: [],
        address: { x: 30, y: 30, fontFamily: 'Arial', color: '#000000', fontSize: 20 },
        date: { x: 30, y: 60, fontFamily: 'Arial', color: '#000000', fontSize: 20 }
      });

    } catch (error) {
      console.error('❌ Error en el proceso de guardado:', error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'Ocurrió un error inesperado al guardar',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const downloadPreview = async () => {
    try {
      console.log('Iniciando descarga de vista previa...');
      const image = await captureInvitationImage();
      if (image) {
        const link = document.createElement('a');
        link.download = `invitation-preview-${Date.now()}.png`;
        link.href = image;
        link.click();
        console.log('✅ Descarga iniciada');
      }
    } catch (error) {
      console.error('❌ Error al descargar:', error);
      Swal.fire('Error', 'No se pudo descargar la imagen', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showGuestModal && (
        <GuestModal
          guests={guests}
          setGuests={setGuests}
          invitationId={invitationId}
          onClose={() => setShowGuestModal(false)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* VISTA PREVIA */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Vista previa de la invitación
          </h2>
          <div
            className="relative w-full h-96 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            ref={previewRef}
          >
            {templates[0] && (
              <img
                src={templates[0].image}
                alt="Plantilla base"
                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
                style={{ zIndex: 0 }}
              />
            )}

            {invitationData.address && (
              <div
                style={{
                  position: 'absolute',
                  top: `${editableElements.address.y}px`,
                  left: `${editableElements.address.x}px`,
                  fontFamily: editableElements.address.fontFamily,
                  color: editableElements.address.color,
                  fontSize: `${editableElements.address.fontSize}px`,
                  padding: '4px',
                  zIndex: 3,
                  userSelect: 'none',
                  cursor: 'move',
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, 'address', 'address')}
                onDragEnd={handleDragEnd}
              >
                {invitationData.address}
              </div>
            )}

            {invitationData.scheduled_at && (
              <div
                style={{
                  position: 'absolute',
                  top: `${editableElements.date.y}px`,
                  left: `${editableElements.date.x}px`,
                  fontFamily: editableElements.date.fontFamily,
                  color: editableElements.date.color,
                  fontSize: `${editableElements.date.fontSize}px`,
                  padding: '4px',
                  zIndex: 3,
                  userSelect: 'none',
                  cursor: 'move',
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, 'date', 'date')}
                onDragEnd={handleDragEnd}
              >
                {new Date(invitationData.scheduled_at).toLocaleString('es-MX', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </div>
            )}

            {editableElements.texts.map((text, idx) => (
              <div
                key={`text-${idx}`}
                style={{
                  position: 'absolute',
                  top: `${text.y}px`,
                  left: `${text.x}px`,
                  fontFamily: text.fontFamily,
                  color: text.color,
                  fontSize: `${text.fontSize}px`,
                  cursor: 'move',
                  zIndex: 2,
                  userSelect: 'none',
                  padding: '4px',
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, idx.toString(), 'text')}
                onDragEnd={handleDragEnd}
              >
                {text.value}
              </div>
            ))}

            {editableElements.images.map((img, idx) => (
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
                  border: '2px dashed #ccc',
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, idx.toString(), 'image')}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              onClick={downloadPreview}
              disabled={isSaving}
            >
             Descargar Vista Previa
            </button>
            
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Herramientas de diseño
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agregar texto:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe tu texto aquí"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                    onClick={handleAddText}
                  >
                    Agregar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de letra:
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color de texto:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="h-10 w-10 cursor-pointer"
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
                    />
                    <span className="text-sm">{fontColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tamaño de texto:
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm">{fontSize}px</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agregar imagen:
                </label>
                <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500">
                  <span className="text-sm text-gray-600">
                    Haz clic para seleccionar una imagen
                  </span>
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Datos del evento
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección del evento:
                </label>
                <input
                  type="text"
                  name="address"
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.address
                      ? 'border-red-500 focus:ring-red-200'
                      : 'focus:ring-blue-500'
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha y hora del evento:
                </label>
                <input
                  type="datetime-local"
                  name="scheduled_at"
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.scheduled_at
                      ? 'border-red-500 focus:ring-red-200'
                      : 'focus:ring-blue-500'
                  }`}
                  value={invitationData.scheduled_at}
                  onChange={handleInvitationChange}
                />
                {errors.scheduled_at && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.scheduled_at}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
           
            <button
              className={`w-full px-4 py-3 rounded-lg font-medium text-white transition-colors ${
                isSaving
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-pink-600 hover:bg-pink-700'
              }`}
              onClick={saveInvitation}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center justify-center">
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
                  Guardando evento e imagen...
                </span>
              ) : (
                'Guardar Evento e Imagen'
              )}
            </button>
            
            {isSaving && (
              <div className="text-center text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-pink-600 rounded-full animate-pulse"></div>
                  <span>Procesando...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templates;
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function GuestModal({ guests, setGuests, invitationId, onClose }) {
  // Estado separado para los nuevos invitados que se van agregando en esta sesión
  const [newGuestsToAdd, setNewGuestsToAdd] = useState([]);
  
  const [newGuest, setNewGuest] = useState({
    name: '',
    lastname: '',
    surname: '',
    email: '',
    phone_number: ''
  });
  const [isSavingGuests, setIsSavingGuests] = useState(false);
  
  const handleGuestChange = (e) => {
    const { name, value } = e.target;
    setNewGuest({ ...newGuest, [name]: value });
  };

  const addGuest = () => {
    if (!newGuest.name.trim() || !newGuest.lastname.trim() || !newGuest.email.trim()) {
      Swal.fire('Error', 'Nombre, apellido y correo electrónico son obligatorios', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newGuest.email)) {
      Swal.fire('Error', 'Correo electrónico inválido', 'error');
      return;
    }
    
    // Agregar solo a la lista de nuevos invitados
    setNewGuestsToAdd([...newGuestsToAdd, newGuest]);
    setNewGuest({ name: '', lastname: '', surname: '', email: '', phone_number: '' });
  };

  const removeGuest = (index) => {
    const updated = [...newGuestsToAdd];
    updated.splice(index, 1);
    setNewGuestsToAdd(updated);
  };

  const saveGuests = async () => {
    if (!invitationId) return;
    if (newGuestsToAdd.length === 0) return;
    
    setIsSavingGuests(true);
    try {
      const payload = {
        guests: newGuestsToAdd.map(g => ({
          name: g.name,
          lastname: g.lastname,
          surname: g.surname || null,
          email: g.email,
          phone_number: g.phone_number || null,
        })),
        invitationId
      };

      const res = await fetch('http://localhost:3000/api/guest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      Swal.fire('¡Éxito!', 'Invitados guardados correctamente', 'success');
      
      // Actualizar la lista principal de invitados con los nuevos
      setGuests([...guests, ...newGuestsToAdd]);
      
      // Limpiar la lista de nuevos invitados
      setNewGuestsToAdd([]);
      onClose();
    } catch (err) {
      Swal.fire('Error', err.message || 'Error al guardar invitados', 'error');
    } finally {
      setIsSavingGuests(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-bold text-gray-800">Gestión de Invitados</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
            {/* Formulario para agregar invitados */}
            <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r overflow-y-auto">
              <h4 className="text-lg font-semibold mb-4">Agregar Nuevo Invitado</h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre(s)*</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newGuest.name}
                      onChange={handleGuestChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Paterno*</label>
                    <input
                      type="text"
                      name="lastname"
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newGuest.lastname}
                      onChange={handleGuestChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Materno</label>
                  <input
                    type="text"
                    name="surname"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newGuest.surname}
                    onChange={handleGuestChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico*</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newGuest.email}
                    onChange={handleGuestChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="phone_number"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newGuest.phone_number}
                    onChange={handleGuestChange}
                  />
                </div>
                
                <button
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={addGuest}
                >
                  Agregar Invitado
                </button>
              </div>
            </div>
            
            {/* Lista de NUEVOS invitados (solo los que se van a agregar) */}
            <div className="w-full md:w-1/2 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Nuevos Invitados a Registrar</h4>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {newGuestsToAdd.length} nuevo{newGuestsToAdd.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {newGuestsToAdd.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <p className="mt-2 text-gray-500">No hay invitados nuevos para registrar</p>
                  <p className="text-sm text-gray-400">Agrega invitados usando el formulario</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {newGuestsToAdd.map((guest, index) => (
                    <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors relative border-blue-200 bg-blue-50">
                      <button 
                        onClick={() => removeGuest(index)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                      <div className="font-medium text-blue-800">{guest.name} {guest.lastname} {guest.surname}</div>
                      <div className="text-sm text-blue-600 mt-1">
                        <svg className="inline mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        {guest.email}
                      </div>
                      {guest.phone_number && (
                        <div className="text-sm text-blue-600 mt-1">
                          <svg className="inline mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          {guest.phone_number}
                        </div>
                      )}
                      <div className="text-xs text-blue-500 mt-1 font-medium">NUEVO</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end p-4 border-t">
            <div className="space-x-3">
              <button
                className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${
                  isSavingGuests ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
                }`}
                onClick={saveGuests}
                disabled={isSavingGuests || newGuestsToAdd.length === 0}
              >
                {isSavingGuests ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </span>
                ) : `Guardar ${newGuestsToAdd.length} Invitado${newGuestsToAdd.length !== 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestModal;
import React, { useState, useEffect } from "react";

function MyEvent() {
  const [invitation, setInvitation] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Función para formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  // Nueva función para manejar estados activo/inactivo
  const getStatus = (status) => {
    // Si status es numérico (1 o 0)
    if (typeof status === 'number') {
      return status === 1 ? "Activo" : "Eliminado";
    }
    // Si status es string (para compatibilidad con valores antiguos)
    switch (status) {
      case "pending":
        return "Pendiente";
      case "confirmed":
        return "Confirmado";
      case "declined":
        return "Rechazado";
      case "1":
        return "Activo";
      case "0":
        return "Eliminado";
      default:
        return "Estado desconocido";
    }
  };

  // Nueva función para clases CSS según estado
  const getStatusClass = (status) => {
    // Si status es numérico (1 o 0)
    if (typeof status === 'number') {
      return status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    }
    // Si status es string (para compatibilidad con valores antiguos)
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      case "1":
        return "bg-green-100 text-green-800";
      case "0":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/invitation/findByUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener la invitación");

        const data = await response.json();
        
        // Filtrar solo invitaciones activas (status = 1) si es necesario
        const activeInvitations = Array.isArray(data.data) 
          ? data.data.filter(inv => inv.status === 1 || inv.status === "1")
          : (data.data.status === 1 || data.data.status === "1") 
            ? [data.data] 
            : [];
            
        setInvitation(activeInvitations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchInvitation();
    }
  }, [userId, token]);

  if (!userId || !token) {
    return (
      <div className="text-red-500">
        No se pudo obtener la invitación. Por favor, inicia sesión.
      </div>
    );
  }

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!invitation || invitation.length === 0) {
    return (
      <div className="text-center py-10">
        No se encontraron invitaciones activas
      </div>
    );
  } 
  return (
    <div className=" min-h-screen">
      <div className="cols-2 grid grid-cols-1 md:grid-cols-2 gap-4 m-6">
        <div>
          <h1 className="text-3xl font-bold mb-4 mt-5 ml-6">
            Gestiona tus eventos e invitaciones
          </h1>
         
        </div>
        <div className="flex justify-end items-center">
         
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4 m-6">
        {/* Puedes personalizar las siguientes estadísticas según datos reales */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
          <span className="text-gray-500 text-sm mb-2">Total de eventos</span>
          <span className="text-3xl font-bold mb-1 jusitify-center">{invitation.length}</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="text-gray-500 text-sm mb-2">Confirmaciones</span>
          <span className="text-3xl font-bold mb-1">80</span>
          <span className="text-green-600 text-xs">
            +12 desde la semana pasada
          </span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="text-gray-500 text-sm mb-2">
            Invitaciones enviadas
          </span>
          <span className="text-3xl font-bold mb-1">180</span>
          <span className="text-green-600 text-xs">
            +25 desde la semana pasada
          </span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="text-gray-500 text-sm mb-2">Tasa de respuesta</span>
          <span className="text-3xl font-bold mb-1">89%</span>
          <span className="text-green-600 text-xs">+5% este mes</span>
        </div>
      </div>

      {/* Lista de eventos */}
      <p className="text-gray-500 font-bold text-xl ml-6">Eventos recientes</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-6 mt-4 mb-6">
        {invitation.map((inv, index) => {
          const statusClass = getStatusClass(inv.status);
          return (
            <a
              href={`/traking/${inv.id_invitation}`} 
              key={index}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-start"
            >
              <div className="flex items-center justify-between mb-4 w-full">
                <span className="font-bold text-xl">
                  {inv.event_name || "Evento"}
                </span>
                <span className={`rounded-full px-4 py-1 ${statusClass}`}>
                  {getStatus(inv.status)}
                </span>
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span>{formatDate(inv.scheduled_at)}</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {inv.address || "Dirección no disponible"}
              </div>
              <div className="text-sm text-gray-700 mt-2">
                {inv.confirmed_guests || 0}/{inv.total_guests || 0} invitados
                confirmados
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default MyEvent;
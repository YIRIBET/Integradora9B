import React, { useState, useEffect } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react"; 

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

        const activeInvitations = Array.isArray(data.data)
          ? data.data.filter((inv) => inv.status === 1 || inv.status === "1")
          : data.data.status === 1 || data.data.status === "1"
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
      <div className="text-red-500 text-center py-10">
        No se pudo obtener la invitación. Por favor, inicia sesión.
      </div>
    );
  }

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!invitation || invitation.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No se encontraron invitaciones activas
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-10 px-6 rounded-b-3xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Gestiona tus eventos e invitaciones
        </h1>
        <p className="text-center text-gray-200 mt-2">
          Consulta los detalles de tus próximos eventos
        </p>
      </div>

      {/* Lista de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {invitation.map((inv, index) => (
          <a
            href={`/traking/${inv.id_invitation}`}
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all p-6 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {inv.event_name || "Evento"}
              </h2>
              <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                Activo
              </span>
            </div>

            <div className="mt-4 flex items-center text-gray-600 text-sm">
              <CalendarDays className="w-4 h-4 mr-2" />
              {formatDate(inv.scheduled_at)}
            </div>

            <div className="mt-2 flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              {inv.address || "Dirección no disponible"}
            </div>

            <div className="mt-2 flex items-center text-gray-600 text-sm">
              <Users className="w-4 h-4 mr-2" />
              {inv.confirmed_guests || 0}/{inv.total_guests || 0} invitados
              confirmados
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default MyEvent;

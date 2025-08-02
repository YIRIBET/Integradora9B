import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Traking() {
  const [selected, setSelected] = useState("todos");
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { invitationId } = useParams();
  const token = localStorage.getItem("token");
  const [invitationData, setInvitationData] = useState({
    address: "",
    scheduled_at: "",
    templates_id_templates: "",
    user_id_user: ""
  });

  const statusMap = {
    1: "confirmado",
    0: "pendiente",
    2: "rechazado",
    3: "talvez",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch guests data
        const guestsResponse = await fetch(
          `http://localhost:3000/api/guest/${invitationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!guestsResponse.ok) throw new Error("Error al obtener los invitados");
        const guestsResult = await guestsResponse.json();

        const guestsArray = Array.isArray(guestsResult.data)
          ? guestsResult.data
          : Array.isArray(guestsResult)
          ? guestsResult
          : [];

        const formattedGuests = guestsArray.map((guest) => ({
          ...guest,
          id: guest.id_guest,
          status: statusMap[guest.status] || "pendiente",
          photo: "https://api.dicebear.com/7.x/pixel-art/svg?seed=randomtext",
        }));

        setGuests(formattedGuests);

        // Fetch invitation data
        const invitationResponse = await fetch(
          `http://localhost:3000/api/invitation/${invitationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!invitationResponse.ok) throw new Error("Error al obtener los datos de la invitación");
        const invitationResult = await invitationResponse.json();
        setInvitationData(invitationResult.data || invitationResult);

      } catch (error) {
        console.error("Error al cargar los datos:", error);
        Swal.fire("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    if (invitationId) {
      fetchData();
    } else {
      console.error("No se encontró invitationId en la URL");
      setLoading(false);
    }
  }, [invitationId, token]);

  const statusCounts = guests.reduce(
    (acc, guest) => {
      acc.total++;
      acc[guest.status] = (acc[guest.status] || 0) + 1;
      return acc;
    },
    { total: 0 }
  );

  const statuses = [
    { label: "Todos", value: "todos", count: guests.length },
    {
      label: "Confirmado",
      value: "confirmado",
      count: statusCounts.confirmado || 0,
    },
    {
      label: "Rechazado",
      value: "rechazado",
      count: statusCounts.rechazado || 0,
    },
    { label: "Tal vez", value: "talvez", count: statusCounts.talvez || 0 },
    {
      label: "Pendiente",
      value: "pendiente",
      count: statusCounts.pendiente || 0,
    },
  ];

  const filteredGuests =
    selected === "todos"
      ? guests
      : guests.filter((guest) => guest.status === selected);

  const responseRate =
    guests.length > 0
      ? ((guests.length - (statusCounts.pendiente || 0)) / guests.length) * 100
      : 0;

const updateInvitation = async () => {
  try {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Invitación',
      html:
        `<input id="address" class="swal2-input" placeholder="Dirección" value="${invitationData.address}">` +
        `<input id="scheduled_at" type="datetime-local" class="swal2-input" placeholder="Fecha" value="${invitationData.scheduled_at}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          address: document.getElementById('address').value,
          scheduled_at: document.getElementById('scheduled_at').value,
          templates_id_templates: invitationData.templates_id_templates, // se mantiene oculto
          user_id_user: invitationData.user_id_user // se mantiene oculto
        };
      }
    });

    if (formValues) {
      const response = await fetch(
        `http://localhost:3000/api/invitation/${invitationId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar la invitación");
      }

      await Swal.fire({
        title: "¡Éxito!",
        text: "La invitación ha sido actualizada correctamente.",
        icon: "success",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#ec4899",
      });

      setInvitationData(formValues);
    }
  } catch (err) {
    console.error("Error al actualizar la invitación:", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message || "No se pudo actualizar la invitación",
    });
  }
};


  const deleteInvitation = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:3000/api/invitation/${invitationId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("Respuesta del servidor:", data);

        if (!response.ok) {
          throw new Error(data.message || "Error al eliminar la invitación");
        }

        await Swal.fire(
          "Se desactivo el evento!",
          "La invitación ha sido eliminada.",
          "success"
        );

        window.location.href = "/mis-eventos";
      }
    } catch (err) {
      console.error("Error completo:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "No se pudo eliminar la invitación",
        footer: `Código de error: ${err.status || "Desconocido"}`,
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Cargando invitados...</p>
        {invitationId && <p>ID de invitación: {invitationId}</p>}
      </div>
    );
  }

  return (
    <div>
      {/* Encabezado */}
      <div className="cols-2 grid grid-cols-1 md:grid-cols-2 gap-4 m-6">
        <div>
          <h1 className="text-3xl font-bold mb-4 mt-5 ml-6">
            Seguimiento de RSVP
          </h1>
          <p className="text-lg text-gray-600 mb-6 ml-6">
            Monitorea las respuestas de los invitados y gestiona tu evento
          </p>
        </div>
        <div className="flex items-center ml-auto">
          <button
            className="bg-blue-400 hover:bg-blue-300 text-white font-semibold py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 mr-2"
            onClick={updateInvitation}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
          <button
            className="bg-red-400 hover:bg-red-300 text-white font-semibold py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
            onClick={deleteInvitation}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
        <div className="flex justify-end items-center"></div>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 m-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="font-bold text-sm">Total de invitados</span>
          <div className="flex items-center ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="size-6 mt-[-30px] me-2 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
              />
            </svg>
          </div>
          <span className="text-3xl font-bold mb-1 mt-3">{guests.length}</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="font-bold text-sm">Confirmado</span>
          <div className="flex items-center ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="green"
              className="size-6 mt-[-30px] me-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <span className="text-3xl font-bold mb-1 text-green-600 mt-3">
            {statusCounts.confirmado || 0}
          </span>
          <span className="text-gray-500">
            {statusCounts.confirmado || 0} asistentes
          </span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="font-bold text-sm">Rechazado</span>
          <div className="flex items-center ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="red"
              className="size-6 mt-[-30px] me-2 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <span className="text-3xl font-bold mb-1 text-red-600 mt-3">
            {statusCounts.rechazado || 0}
          </span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="font-bold text-sm">Tal vez</span>
          <div className="flex items-center ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="yellow"
              className="size-6 mt-[-30px] me-2 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <span className="text-3xl font-bold mb-1 text-yellow-600 mt-3">
            {statusCounts.talvez || 0}
          </span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="font-bold text-sm">Pendiente</span>
          <div className="flex items-center ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="size-6 mt-[-30px] me-2 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <span className="text-3xl font-bold mb-1 text-gray-400 mt-3">
            {statusCounts.pendiente || 0}
          </span>
        </div>
      </div>

      {/* Filtros tipo pestañas */}
      <div className="rounded-lg border border-gray-200 m-5 p-3">
        <p className="text-gray-500 font-bold text-xl ml-2">
          Lista de invitados y sus respuestas
        </p>
        <p className="text-sm text-gray-600 mb-4 ml-2">
          Gestionar y realizar un seguimiento de las respuestas individuales de
          los huéspedes
        </p>
        <div className="flex gap-4 bg-gray-100 p-2 rounded-lg w-fit">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => setSelected(status.value)}
              className={`px-3 py-1 rounded-md text-sm transition-all
                ${
                  selected === status.value
                    ? "bg-white font-bold text-black"
                    : "text-gray-500 hover:text-black"
                }`}
            >
              {status.label} ({status.count})
            </button>
          ))}
        </div>

        {filteredGuests.length > 0 ? (
          filteredGuests.map((guest) => (
            <div
              key={guest.id}
              className="mt-6 flex bg-gray-50 p-6 rounded-lg items-center"
            >
              <img
                src={guest.photo}
                alt="Avatar de usuario"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4">
                <p className="font-bold">
                  {guest.name} {guest.lastname}
                </p>
                <p className="text-gray-600">{guest.email}</p>
              </div>
              <div className="flex items-center ml-auto">
                <span
                  className={`rounded-full px-3 py-1 text-sm capitalize ${
                    guest.status === "confirmado"
                      ? "bg-green-200 text-green-700"
                      : guest.status === "rechazado"
                      ? "bg-red-200 text-red-700"
                      : guest.status === "talvez"
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {guest.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-6 text-gray-500 text-center">
            No hay invitados en esta categoría
          </p>
        )}
      </div>
    </div>
  );
}

export default Traking;
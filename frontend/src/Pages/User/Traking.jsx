import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import GuestModal from "../../Components/user/GuestModal";

function EmailPreviewModal({ guest, invitation, onClose, onSend }) {
  const url = `${window.location.origin}/invitation-response/${guest.id_guest}`;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Vista Previa del Email</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div style={{
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <div style={{
              backgroundColor: '#ec4899',
              color: 'white',
              padding: '20px',
              textAlign: 'center',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px'
            }}>
              <h1 style={{ margin: '0', fontSize: '24px' }}>¡Estás invitado!</h1>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              lineHeight: '1.6'
            }}>
              <p>Hola {guest.name} {guest.lastname},</p>
              <p>Te invitamos cordialmente a nuestro evento especial. ¡Será un gusto contar con tu presencia!</p>
              
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h3 style={{ color: '#ec4899', marginTop: '0' }}>Detalles del evento:</h3>
                <p><strong>Fecha:</strong> {new Date(invitation.scheduled_at).toLocaleDateString()}</p>
                <p><strong>Hora:</strong> {new Date(invitation.scheduled_at).toLocaleTimeString()}</p>
                <p><strong>Lugar:</strong> {invitation.address}</p>
                {invitation.additional_notes && (
                  <p><strong>Notas:</strong> {invitation.additional_notes}</p>
                )}
              </div>

              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <a 
                  href={url} 
                  style={{
                    backgroundColor: '#ec4899',
                    color: 'white',
                    padding: '12px 30px',
                    textDecoration: 'none',
                    borderRadius: '25px',
                    display: 'inline-block',
                    fontWeight: 'bold'
                  }}
                >
                  Confirmar Asistencia
                </a>
              </div>

              <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
                Si el botón no funciona, copia y pega este enlace en tu navegador:<br />
                <small style={{ wordBreak: 'break-all' }}>{url}</small>
              </p>

              <p style={{ marginTop: '40px' }}>
                Atentamente,<br />
                <strong>El equipo organizador</strong>
              </p>
            </div>

            <div style={{
              backgroundColor: '#6b7280',
              color: 'white',
              padding: '15px',
              textAlign: 'center',
              fontSize: '12px',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px'
            }}>
              © {new Date().getFullYear()} Todos los derechos reservados.
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onSend}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            Enviar Invitación
          </button>
        </div>
      </div>
    </div>
  );
}

function Traking() {
  const [selected, setSelected] = useState("todos");
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const { invitationId } = useParams();
  const token = localStorage.getItem("token");
  
  const [invitationData, setInvitationData] = useState({
    address: "",
    scheduled_at: "",
    templates_id_templates: "",
    user_id_user: "",
  });

  const statusMap = {
    1: "confirmado",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const guestsResponse = await fetch(
          `http://localhost:3000/api/guest/${invitationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!guestsResponse.ok)
          throw new Error("Error al obtener los invitados");
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

        const invitationResponse = await fetch(
          `http://localhost:3000/api/invitation/${invitationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!invitationResponse.ok)
          throw new Error("Error al obtener los datos de la invitación");
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
    }
  ];

  const filteredGuests =
    selected === "todos"
      ? guests
      : guests.filter((guest) => guest.status === selected);

  const showEmailPreview = (guest) => {
    setSelectedGuest(guest);
    setShowPreview(true);
  };

  const sendWhatsAppInvitation = (phoneNumber) => {
    const message = `¡Hola! Te invitamos cordialmente a nuestro evento especial.\n\n${invitationData.invtation_image}\nFecha: ${new Date(invitationData.scheduled_at).toLocaleDateString()}\n Hora: ${new Date(invitationData.scheduled_at).toLocaleTimeString()}\n Lugar: ${invitationData.address}\n\n¡Será un gusto contar con tu presencia!\n\nConfirma tu asistencia aquí: ${window.location.origin}/invitation-response/${selectedGuest?.id_guest || ''}\n\nAtentamente,\nEl equipo organizador`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendEmailInvitation = async (guestId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/guest/send-invitation/${guestId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar la invitación');
      }

      setShowPreview(false);
      Swal.fire(
        '¡Éxito!',
        'La invitación se ha enviado correctamente',
        'success'
      );
    } catch (error) {
      console.error('Error al enviar invitación:', error);
      Swal.fire(
        'Error',
        error.message || 'Ocurrió un error al enviar la invitación',
        'error'
      );
    }
  };

  const updateInvitation = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Editar Invitación",
        html:
          `<input id="address" class="swal2-input" placeholder="Dirección" value="${invitationData.address}">` +
          `<input id="scheduled_at" type="datetime-local" class="swal2-input" placeholder="Fecha" value="${invitationData.scheduled_at}">`,
        focusConfirm: false,
        preConfirm: () => {
          return {
            address: document.getElementById("address").value,
            scheduled_at: document.getElementById("scheduled_at").value,
            templates_id_templates: invitationData.templates_id_templates,
            user_id_user: invitationData.user_id_user,
          };
        },
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
      {showGuestModal && (
        <GuestModal
          guests={guests}
          setGuests={setGuests}
          invitationId={invitationId}
          onClose={() => setShowGuestModal(false)}
        />
      )}

      {showPreview && selectedGuest && (
        <EmailPreviewModal
          guest={selectedGuest}
          invitation={invitationData}
          onClose={() => setShowPreview(false)}
          onSend={() => sendEmailInvitation(selectedGuest.id_guest)}
        />
      )}

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
          <button
            className="bg-red-400 hover:bg-red-300 text-white font-semibold py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
            onClick={deleteInvitation}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 m-5 p-3">
        <div className="flex p-2 rounded-lg justify-between items-center">
          <p className="text-gray-500 font-bold text-xl ml-2">
            Lista de invitados y sus respuestas
          </p>
          <button
            className="mt-6 -end bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
            onClick={() => setShowGuestModal(true)}
          >
            Agregar invitados
          </button>
        </div>

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
                <p className="text-gray-500 text-sm">
                  {guest.phone_number}
                </p>
              </div>
              <div className="flex items-center ml-auto gap-2">
                <button
                  onClick={() => showEmailPreview(guest)}
                  title="Vista previa y enviar invitación por email"
                  className="flex items-center gap-2 px-3 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 text-sm transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                  
                </button>
                <button
                  onClick={() => sendWhatsAppInvitation(guest.phone_number)}
                  title="Enviar por WhatsApp"
                  className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="16"
                    height="16"
                    viewBox="0 0 50 50"
                    fill="currentColor"
                  >
                    <path d="M 25 2 C 12.3 2 2 12.3 2 25 C 2 29.1 3.1 32.899219 5 36.199219 L 2 46.699219 C 1.9 46.999219 1.9992187 47.399219 2.1992188 47.699219 C 2.4992187 47.999219 2.8992187 48 3.1992188 48 L 14.199219 45.300781 C 17.399219 47.000781 21.1 48 25 48 C 37.7 48 48 37.7 48 25 C 48 12.3 37.7 2 25 2 z M 25 4 C 36.6 4 46 13.4 46 25 C 46 36.6 36.6 46 25 46 C 21.3 46 17.800781 45.000781 14.800781 43.300781 C 14.600781 43.200781 14.299609 43.099219 14.099609 43.199219 L 4.5 45.599609 L 7 36.400391 C 7.1 36.100391 7.0003906 35.899609 6.9003906 35.599609 C 5.1003906 32.499609 4 28.9 4 25 C 4 13.4 13.4 4 25 4 z M 18.113281 12.988281 C 17.925781 12.975781 17.800781 13 17.800781 13 L 16.599609 13 C 15.999609 13 15.100781 13.2 14.300781 14 C 13.800781 14.5 12 16.3 12 19.5 C 12 22.9 14.299609 25.799609 14.599609 26.099609 C 14.599609 26.099609 15 26.600781 15.5 27.300781 C 16 28.000781 16.699609 28.800781 17.599609 29.800781 C 19.399609 31.700781 21.899609 33.899219 25.099609 35.199219 C 26.499609 35.799219 27.699609 36.2 28.599609 36.5 C 30.199609 37 31.700781 36.900781 32.800781 36.800781 C 33.600781 36.700781 34.500391 36.299219 35.400391 35.699219 C 36.300391 35.099219 37.199609 34.400391 37.599609 33.400391 C 37.899609 32.600391 37.999609 31.900781 38.099609 31.300781 L 38.099609 30.5 C 38.099609 30.2 38.000781 30.200781 37.800781 29.800781 C 37.300781 29.000781 36.799219 29.000781 36.199219 28.800781 C 35.899219 28.600781 34.999219 28.200781 34.199219 27.800781 C 33.299219 27.400781 32.599609 27.000781 32.099609 26.800781 C 31.799609 26.700781 31.400391 26.499609 30.900391 26.599609 C 30.400391 26.699609 29.899609 27 29.599609 27.5 C 29.299609 27.9 28.200781 29.299219 27.800781 29.699219 L 27.699219 29.599609 C 27.299219 29.399609 26.7 29.200781 26 28.800781 C 25.2 28.400781 24.299219 27.800781 23.199219 26.800781 C 21.599219 25.400781 20.499219 23.699609 20.199219 23.099609 C 20.499219 22.699609 20.899609 22.3 21.099609 22 C 21.199609 21.9 21.280859 21.799219 21.349609 21.699219 C 21.418359 21.599219 21.475391 21.500391 21.525391 21.400391 C 21.625391 21.200391 21.700781 21.000781 21.800781 20.800781 C 22.200781 20.100781 22.000781 19.300391 21.800781 18.900391 C 21.800781 18.900391 21.7 18.600781 21.5 18.300781 C 21.4 18.000781 21.2 17.499609 21 17.099609 C 20.6 16.199609 20.2 15.199609 20 14.599609 C 19.7 13.899609 19.300781 13.399219 18.800781 13.199219 C 18.550781 13.049219 18.300781 13.000781 18.113281 12.988281 z M 16.599609 15 L 17.699219 15 L 17.900391 15 C 17.900391 15 17.999609 15.100391 18.099609 15.400391 C 18.299609 16.000391 18.799609 17.000391 19.099609 17.900391 C 19.299609 18.300391 19.499609 18.799609 19.599609 19.099609 C 19.699609 19.399609 19.800391 19.600781 19.900391 19.800781 C 19.900391 19.900781 20 19.900391 20 19.900391 C 19.8 20.300391 19.8 20.399219 19.5 20.699219 C 19.2 21.099219 18.799219 21.499219 18.699219 21.699219 C 18.599219 21.899219 18.299609 22.1 18.099609 22.5 C 17.899609 22.9 18.000781 23.599609 18.300781 24.099609 C 18.700781 24.699609 19.900781 26.700391 21.800781 28.400391 C 23.000781 29.500391 24.1 30.199609 25 30.599609 C 25.9 31.099609 26.600781 31.300391 26.800781 31.400391 C 27.200781 31.600391 27.599609 31.699219 28.099609 31.699219 C 28.599609 31.699219 29.000781 31.3 29.300781 31 C 29.700781 30.6 30.699219 29.399609 31.199219 28.599609 L 31.400391 28.699219 C 31.400391 28.699219 31.699609 28.8 32.099609 29 C 32.499609 29.2 32.900391 29.399609 33.400391 29.599609 C 34.300391 29.999609 35.100391 30.399609 35.400391 30.599609 L 36 30.900391 L 36 31.199219 C 36 31.599219 35.899219 32.200781 35.699219 32.800781 C 35.599219 33.100781 35.000391 33.699609 34.400391 34.099609 C 33.700391 34.499609 32.899609 34.800391 32.599609 34.900391 C 31.699609 35.000391 30.600781 35.099219 29.300781 34.699219 C 28.500781 34.399219 27.4 34.1 26 33.5 C 23.2 32.3 20.899219 30.3 19.199219 28.5 C 18.399219 27.6 17.699219 26.799219 17.199219 26.199219 C 16.699219 25.599219 16.500781 25.2 16.300781 25 C 15.900781 24.6 14 21.999609 14 19.599609 C 14 17.099609 15.200781 16.100391 15.800781 15.400391 C 16.100781 15.000391 16.499609 15 16.599609 15 z"></path>
                  </svg>
                
                </button>
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
import React, { useState } from "react";

function Traking() {
  const [selected, setSelected] = useState("todos");

  const statuses = [
    { label: "Todos", value: "todos", count: 5 },
    { label: "Confirmado", value: "confirmado", count: 2 },
    { label: "Rechazado", value: "rechazado", count: 1 },
    { label: "Tal vez", value: "talvez", count: 1 },
    { label: "Pendiente", value: "pendiente", count: 1 },
  ];

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
              stroke-width="1.5"
              stroke="gray"
              class="size-6 mt-[-30px] me-2 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
              />
            </svg>
           
          </div>
          <span className="text-3xl font-bold mb-1 mt-3">4</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="font-bold text-sm">Confirmado</span>
          <div className="flex items-center ml-auto">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="green"
              class="size-6 mt-[-30px] me-2"

            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <span className="text-3xl font-bold mb-1 text-green-600 mt-3">4</span>
          <span className="text-gray-500">3 asistentes</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="font-bold text-sm">Rechazado</span>
          <div className="flex items-center ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              class="size-6 mt-[-30px] me-2 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <span className="text-3xl font-bold mb-1 text-red-600 mt-3">4</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="font-bold text-sm">Tal vez</span>
          <div className="flex items-center ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="yellow"
              class="size-6 mt-[-30px] me-2 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <span className="text-3xl font-bold mb-1 text-yellow-600 mt-3">
            4
          </span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="font-bold text-sm">Pendiente</span>
          <div className="flex items-center ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="gray"
              class="size-6 mt-[-30px] me-2 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <span className="text-3xl font-bold mb-1 text-gray-400 mt-3">4</span>
        </div>
      </div>

      {/* Barra de respuesta */}
      <div className="rounded-lg border border-gray-200 m-5 p-3">
        <p className="text-gray-500 font-bold text-xl ml-2">
          Tasa de respuesta
        </p>
        <p className="text-gray-500 text-sm ml-2">
          4 de 5 invitados han respondido
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4 ml-2">
          <div
            className="bg-black h-2.5 rounded-full"
            style={{ width: "80%" }}
          ></div>
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

        <div className="mt-6 flex bg-gray-50 p-6 rounded-lg">
          <img
            src="https://randomuser.me/api/portraits/women/45.jpg"
            alt="Avatar de usuario"
            className="w-12 h-12 rounded-full mb-4 object-cover"
          />
          <div>
            <p className="font-bold ml-6">Juan Smith</p>
            <p className=" ml-6">juan@ejemplo.com</p>
          </div>
          <div className="flex items-center ml-auto">
            <button className="rounded-full p-2 py-0 border-1 border-green-300 bg-green-200 text-green-700 text-sm">
              confirmado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponente para las tarjetas
const Card = ({ title, value, change }) => (
  <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
    <span className="text-gray-500 text-sm mb-2">{title}</span>
    <span className="text-3xl font-bold mb-1">{value}</span>
    <span className="text-green-600 text-xs">{change}</span>
  </div>
);

export default Traking;

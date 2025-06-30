import React from "react";

function MyEvent() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="cols-2 grid grid-cols-1 md:grid-cols-2 gap-4 m-6">
        <div>
          <h1 className="text-3xl font-bold mb-4 mt-5 ml-6">
            ¡Bienvenido de nuevo!
          </h1>
          <p className="text-lg text-gray-600 mb-6 ml-6">
            Gestiona tus eventos e invitaciones
          </p>
        </div>
        <div className="flex justify-end items-center">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 me-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Crear un nuevo evento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-4 gap-4 m-6">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
         <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="gray"
              class="size-6 me-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
              />
            </svg>

            <span className="text-gray-500 text-sm mb-2">
              Total de eventos
            </span>
          </div>
          <span className="text-3xl font-bold mb-1">4</span>
          <span className="text-green-600 text-xs">+1 desde el mes pasado</span>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="text-gray-500 text-sm mb-2">
            Total de confirmaciones de asistencia
          </span>
          <span className="text-3xl font-bold mb-1">80</span>
          <span className="text-green-600 text-xs">
            +12 desde la semana pasada
          </span>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="text-gray-500 text-sm mb-2">
            Invitaciones enviadas
          </span>
          <span className="text-3xl font-bold mb-1">180</span>
          <span className="text-green-600 text-xs">
            +25 desde la semana pasada
          </span>
        </div>
        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="text-gray-500 text-sm mb-2">Tasa de respuesta</span>
          <span className="text-3xl font-bold mb-1">89%</span>
          <span className="text-green-600 text-xs">
            +5% respecto al mes pasado
          </span>
        </div>
      </div>
      <p className="text-gray-500 font-bold text-xl ml-6">Eventos recientes</p>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 m-6 mt-4 mb-6 ">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <div className="flex items-center justify-between mb-4 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 me-2 text-green-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            
            <span className="font-bold text-xl ">La boda de Sarah</span>
            <button className="rounded-full p-2 py-0 border-1 border-green-300 bg-green-200 text-green-700 text-sm"> confirmado</button>
          </div>
          <div className="flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="gray"
              class="size-4 me-2 mt-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
              />
            </svg>

            <span className="text-gray-500 text-sm mt-4 ">
              15/07/2024 a las 16:00
            </span>
          </div>
          <span className="text-gray-500 text-sm mb-6">
            Complejo turístico Garden Valley
          </span>
          <div className="flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="gray"
              class="size-4 me-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>

            <span className="text-mb">40/60 invitados</span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="font-bold text-l mb-2">La boda de Sarah</span>
          <span className="text-gray-500 text-sm ">15/07/2024 a las 16:00</span>
          <span className="text-gray-500 text-sm mb-6">
            Complejo turístico Garden Valley
          </span>
          <span className="text-mb">40/60 invitados</span>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
          <span className="font-bold text-l mb-2">La boda de Sarah</span>
          <span className="text-gray-500 text-sm ">15/07/2024 a las 16:00</span>
          <span className="text-gray-500 text-sm mb-6">
            Complejo turístico Garden Valley
          </span>
          <span className="text-mb">40/60 invitados</span>
        </div>
      </div>
      {/* Add your event content here */}
    </div>
  );
}

export default MyEvent;

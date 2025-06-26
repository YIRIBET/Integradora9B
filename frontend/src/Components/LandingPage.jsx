function LandigPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mt-5 me-6">
        <div className="me-3 max-w-2xl ml-5 mt-20 ">
          {/* Título principal */}
          <h1 className="font-bold text-left text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight">
            Crea invitaciones digitales que impresionen
          </h1>

          <p className="text-left text-base md:text-md text-gray-700 mb-8 leading-relaxed max-w-prose">
            Personaliza, envía y rastrea fácilmente las confirmaciones de
            asistencia. Haz que cada evento sea memorable con hermosas
            invitaciones digitales.
          </p>

          <div className="text-left">
            <div className="flex flex-wrap gap-4 mt-6">
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                Empezar
              </button>
              <button className="bg-transparent hover:bg-pink-100 text-pink-500 font-medium py-2 px-8 rounded-full border-2 border-pink-500 transition-all duration-300">
                Ver plantillas
              </button>
            </div>
          </div>
        </div>
        <div className="mb-10 bg-[#f2d7fc] rounded-lg p-4">
          <img
            className="mx-auto w-full h-auto max-w-xl rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            alt="Descripción de la imagen"
          />
        </div>
      </div>

      <div className="justify-center align-center text-center mt-10 mb-10 ">
        <p className="font-bold  text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 leading-tight">
          Cómo funciona
        </p>
        <p className="text-l md:text-xl text-gray-700 mb-8 leading-relaxed max-w-prose mx-auto">
          Crea invitaciones impresionantes en solo cuatro sencillos pasos
        </p>

        <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mt-20 m-6">
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 25 25 "
              stroke-width="1.5"
              stroke="white"
              className="inline-block bg-pink-400 rounded-full p-4 w-6 h-6 md:w-10 md:h-10 lg:w-17 lg:h-17"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 mt-9 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Elija una plantilla
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Explore nuestra colección de hermosas plantillas diseñadas
              profesionalmente.
            </p>
          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="inline-block bg-blue-400 rounded-full p-4 w-6 h-6 md:w-10 md:h-10 lg:w-17 lg:h-17"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 mt-9 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Personalizar detalles
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Añade información de tu evento, fotos y toques personales.
            </p>
          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="inline-block bg-green-400 rounded-full p-4 w-6 h-6 md:w-10 md:h-10 lg:w-17 lg:h-17"

            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 mt-9 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Enviar invitaciones
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Comparte por correo electrónico, WhatsApp o redes sociales con un
              solo clic
            </p>
          </div>

          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="White"
              className="inline-block bg-purple-400 rounded-full p-4 w-6 h-6 md:w-10 md:h-10 lg:w-17 lg:h-17"
              role="img"
              aria-label="Icono de vista"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 mt-9 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Seguimiento de respuestas
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Monitorea las confirmaciones de asistencia y la asistencia en un
              panel de control en tiempo real
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white justify-center align-center text-center mt-20 mb-10  ">
        <p className="font-bold  text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 mt-10 leading-tight">
          Funciones potentes
        </p>
        <p className="text-l md:text-xl text-gray-700 mb-8 leading-relaxed max-w-prose mx-auto">
          Todo lo que necesitas para crear, gestionar y realizar un seguimiento
          de tus invitaciones a eventos
        </p>
        <div className="grid grid-cols-4 md:grid-cols-3 gap-4 mt-20 m-6">
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 inline-block  mb-4 bg-[#f2d7fc] rounded-full p-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Elija una plantilla
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Explore nuestra colección de hermosas plantillas diseñadas
              profesionalmente.
            </p>
          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 inline-block  mb-4 bg-[#f2d7fc] rounded-full p-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Elija una plantilla
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Explore nuestra colección de hermosas plantillas diseñadas
              profesionalmente.
            </p>
          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 inline-block  mb-4 bg-[#f2d7fc] rounded-full p-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Elija una plantilla
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Explore nuestra colección de hermosas plantillas diseñadas
              profesionalmente.
            </p>
          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 inline-block  mb-4 bg-[#f2d7fc] rounded-full p-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Elija una plantilla
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Explore nuestra colección de hermosas plantillas diseñadas
              profesionalmente.
            </p>
          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 inline-block  mb-4 bg-[#f2d7fc] rounded-full p-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Elija una plantilla
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Explore nuestra colección de hermosas plantillas diseñadas
              profesionalmente.
            </p>
          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 inline-block  mb-4 bg-[#f2d7fc] rounded-full p-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Elija una plantilla
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Explore nuestra colección de hermosas plantillas diseñadas
              profesionalmente.
            </p>
          </div>
        </div>
      </div>
      <div className="justify-center align-center text-center mt-10 mb-10 ">
        <p className="font-bold  text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 leading-tight">
          Cómo funciona
        </p>
        <p className="text-l md:text-xl text-gray-700 mb-8 leading-relaxed max-w-prose mx-auto">
          Crea invitaciones impresionantes en solo cuatro sencillos pasos
        </p>
        <div className="grid grid-cols-4 md:grid-cols-3 gap-3 mt-20 m-6">
          <div class="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#" class="block aspect-video overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                alt="Invitación de boda elegante"
              />
            </a>
            <div class="px-4 py-3">
              <a href="#">
                <h5 class="text-lg text-start  tracking-tight text-gray-900 dark:text-white">
                  Boda elegante
                </h5>
              </a>
            </div>
          </div>
          <div class="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#" class="block aspect-video overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                alt="Invitación de boda elegante"
              />
            </a>
            <div class="px-4 py-3">
              <a href="#">
                <h5 class="text-lg text-start  tracking-tight text-gray-900 dark:text-white">
                  Boda elegante
                </h5>
              </a>
            </div>
          </div>
          <div class="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#" class="block aspect-video overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                alt="Invitación de boda elegante"
              />
            </a>
            <div class="px-4 py-3">
              <a href="#">
                <h5 class="text-lg text-start  tracking-tight text-gray-900 dark:text-white">
                  Boda elegante
                </h5>
              </a>
            </div>
          </div>
          <div class="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#" class="block aspect-video overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                alt="Invitación de boda elegante"
              />
            </a>
            <div class="px-4 py-3">
              <a href="#">
                <h5 class="text-lg text-start  tracking-tight text-gray-900 dark:text-white">
                  Boda elegante
                </h5>
              </a>
            </div>
          </div>
          <div class="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#" class="block aspect-video overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                alt="Invitación de boda elegante"
              />
            </a>
            <div class="px-4 py-3">
              <a href="#">
                <h5 class="text-lg text-start  tracking-tight text-gray-900 dark:text-white">
                  Boda elegante
                </h5>
              </a>
            </div>
          </div>
          <div class="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#" class="block aspect-video overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                alt="Invitación de boda elegante"
              />
            </a>
            <div class="px-4 py-3">
              <a href="#">
                <h5 class="text-lg text-start  tracking-tight text-gray-900 dark:text-white">
                  Boda elegante
                </h5>
              </a>
            </div>
          </div>
        </div>
        <button className="mt-10">
          <a
            href="#"
            className="bg-transparent hover:bg-pink-100 text-pink-500 font-medium py-2 px-8 rounded-full border-2 border-pink-500 transition-all duration-300"
          >
            Ver más plantillas
          </a>
        </button>
      </div>
      <div className="bg-white justify-center align-center text-center mt-20 mb-10  ">
        <p className="font-bold  text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 mt-10 leading-tight">
          Lo que dicen nuestros usuarios
        </p>
        <p className="text-l md:text-xl text-gray-700 mb-8 leading-relaxed max-w-prose mx-auto">
          Únase a miles de organizadores de eventos satisfechos que confían en
          HACETS
        </p>
        <div className="grid grid-cols-4 md:grid-cols-3 gap-4 mt-20 m-6">
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 inline-block  mb-4 bg-[#f2d7fc] rounded-full p-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Elija una plantilla
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Explore nuestra colección de hermosas plantillas diseñadas
              profesionalmente.
            </p>
          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 inline-block  mb-4 bg-[#f2d7fc] rounded-full p-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Elija una plantilla
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Explore nuestra colección de hermosas plantillas diseñadas
              profesionalmente.
            </p>
          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 inline-block  mb-4 bg-[#f2d7fc] rounded-full p-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Elija una plantilla
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Explore nuestra colección de hermosas plantillas diseñadas
              profesionalmente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandigPage;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Simulación de estado de autenticación y perfil de usuario
  const isUserProfile = true; // Cambia esto según tu lógica de autenticación

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="./assets/LogoHACETS.png"
            alt="HACETS Logo"
            className="h-8 w-8"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            HACETS
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu items */}
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {isUserProfile ? (
              <>
                <li>
                  <Link
                    to="/"
                    className="block py-3 px-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mis-eventos"
                    className="block py-3 px-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Mis Eventos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/home"
                    className="block py-3 px-4 text-gray-500  rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Plantillas
                  </Link>
                </li>
                <li>
                  <a
                    href="/profile"
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom"
                  >
                    <span class="sr-only">Open user menu</span>

                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://randomuser.me/api/portraits/women/45.jpg"
                      alt="user photo"
                    />
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/inicio-sesion"
                    className="block py-3 px-4 text-gray-500 border border-gray-200 rounded hover:bg-gray-100 md:hover:bg-gray-100/10 md:hover:text-pink-700 md:p-2 dark:text-white md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

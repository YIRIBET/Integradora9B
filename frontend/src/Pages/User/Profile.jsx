import React from "react";

function Profile() {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-10">Perfil de Usuario</h1>
           <div className="grid grid-cols-2 md:grid-cols-2 gap-2  m-6">
                
                <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col items-center">
                        <img
                            src="https://randomuser.me/api/portraits/women/45.jpg"
                            alt="Avatar de usuario"
                            className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                        <form className="w-full">
                            <div className="mb-4 cols-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div>
                                <label className="block text-gray-700" htmlFor="name">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    placeholder="Tu nombre"
                                />
                                </div> 
                                 <div>
                                    <label className="block text-gray-700" htmlFor="name">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    placeholder="Tu nombre"
                                />
                                 </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    placeholder="Tu email"
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
                <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Seguridad</h2>
                    <p className="text-gray-600 mb-6 text-center">
                        Administre la seguridad y privacidad de su cuenta
                    </p>
                    <form className="w-full">
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="current-password">
                                Contraseña actual
                            </label>
                            <input
                                type="password"
                                id="current-password"
                                name="current-password"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="Ingrese su contraseña actual"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="new-password">
                                Nueva contraseña
                            </label>
                            <input
                                type="password"
                                id="new-password"
                                name="new-password"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="Ingrese su nueva contraseña"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700" htmlFor="confirm-password">
                                Confirmar nueva contraseña
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="Confirme su nueva contraseña"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
                        >
                            Actualizar contraseña
                        </button>
                    </form>
                </div>
                
           </div>
        </div>
    );
}

export default Profile;
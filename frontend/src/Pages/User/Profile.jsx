import React, { useState } from "react";
import Swal from "sweetalert2";

function Profile() {
    const [recoveryEmail, setRecoveryEmail] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/passwordRecovery/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: recoveryEmail }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Correo enviado",
                    text: "Revisa tu correo para restablecer la contraseña.",
                });
                setRecoveryEmail("");
            } else {
                throw new Error("Error al enviar el correo");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error al enviar el correo.",
            });
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen  items-center justify-center">
            
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 m-6">
                {/* Información del perfil */}
                <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col items-center">
                        <img
                            src="https://randomuser.me/api/portraits/women/45.jpg"
                            alt="Avatar de usuario"
                            className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                        <form className="w-full">
                            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700" htmlFor="name">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700" htmlFor="lastname">Apellido</label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        placeholder="Tu apellido"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700" htmlFor="email">Email</label>
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

                {/* Seguridad y recuperación de contraseña */}
                <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
                   <h3 className="text-lg font-semibold mb-2 text-center">¿Olvidaste tu contraseña?</h3>
            
                    <hr className="my-13" />

                    <form onSubmit={handleForgotPassword}>
                        
                        <input
                            type="email"
                            value={recoveryEmail}
                            onChange={(e) => setRecoveryEmail(e.target.value)}
                            placeholder="Ingresa tu correo"
                            required
                            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
                        >
                            Enviar enlace de recuperación
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;

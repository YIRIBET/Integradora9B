import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/passwordRecovery/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    newPassword: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Contraseña actualizada",
                    text: data.message || "Contraseña restablecida correctamente.",
                });
                setPassword("");
                // Opcional: redirigir después de éxito
                 window.location.href = "/login";
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.error || "El token ha expirado o no es válido.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo conectar con el servidor.",
            });
        }
    };

    return (
       <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto m-6 p-6 bg-white rounded-lg shadow-md justify-center items-center">
            <h2 className="text-2xl font-bold text-center mb-6">Restablecer contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
                >
                    Restablecer
                </button>
            </form>
        </div>
        </div>
    );
};

export default ResetPassword;

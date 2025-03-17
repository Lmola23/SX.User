import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/AuthProvider/AuthProvider.jsx";
import "./Login.css"; // Importa el nuevo archivo CSS

export default function Login() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth(); // Obtener la función login del contexto
  const navigate = useNavigate();

  // Manejar el envío del formulario de inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!nombreUsuario || !contraseña) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5249/api/Cliente/Account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ NombreUsuario: nombreUsuario, Contraseña: contraseña }),
        credentials: "include", // Importante para que el navegador envíe y reciba cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el inicio de sesión");
      }

      console.log("Inicio de sesión exitoso");
      login(); // Actualizar el estado de autenticación
      navigate("/dashboard"); // Redirigir a la página protegida
    } catch (error) {
      console.error("Error en el login:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-modern-container">
      <h2 className="login-modern-title">Iniciar Sesión</h2>
      {errorMessage && <p className="login-modern-error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin} className="login-modern-form">
        <div className="input-group">
          <label htmlFor="nombreUsuario">Nombre de Usuario</label>
          <input
            type="text"
            id="nombreUsuario"
            placeholder="Ingresa tu nombre de usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            placeholder="Ingresa tu contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-modern-button">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
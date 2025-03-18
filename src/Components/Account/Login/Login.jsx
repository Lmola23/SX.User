// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/AuthProvider/AuthProvider.jsx";
import "./Login.css";

export default function Login() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!nombreUsuario || !contraseña) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      const result = await login(nombreUsuario, contraseña);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setErrorMessage(result.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setErrorMessage("Error inesperado durante el inicio de sesión.");
    }
  };

  return (
    <div className="login-modern-container">
      <h2 className="login-modern-title">Iniciar Sesión</h2>
      {errorMessage && <p className="login-modern-error-message">{errorMessage}</p>}
      <form onSubmit={handleLoginSubmit} className="login-modern-form"> {/* Asegúrate de que onSubmit llama a handleLoginSubmit */}
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/AuthProvider/AuthProvider.jsx";
import { requestNotificationPermission } from "../../../firebaseconf.js";
import Modal from "../../Modal/Modal.jsx";
import "./Register.css";

export default function RegisterModern() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [welcomeModal, setWelcomeModal] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!nombreUsuario || !contraseña || !numeroTelefono) {
      setErrorMessage("Todos los campos son obligatorios.");
      setIsLoading(false);
      return;
    }

    if (notificationsEnabled) {
      await requestNotificationPermissionAndRegister();
    } else {
      await registerUser(""); // Registra sin el token
    }
  };

  const requestNotificationPermissionAndRegister = async () => {
    try {
      const token = await requestNotificationPermission();
      console.log("Token de dispositivo obtenido:", token);
      await registerUser(token);
    } catch (error) {
      console.error("Error al obtener permisos de notificación:", error);
      setErrorMessage("Error al obtener permisos de notificación.");
      setIsLoading(false);
    }
  };

  const registerUser = async (deviceToken) => {
    try {
      const response = await fetch("http://localhost:5249/api/Cliente/Account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          NombreUsuario: nombreUsuario,
          Contraseña: contraseña,
          NumeroTelefono: numeroTelefono,
          DeviceToken: deviceToken,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el registro");
      }

      console.log("Registro exitoso. Iniciando sesión...");
      await handleLogin();
    } catch (error) {
      console.error("Error en el registro:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5249/api/Cliente/Account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ NombreUsuario: nombreUsuario, Contraseña: contraseña }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el login");
      }

      const result = await response.json();
      console.log("Login exitoso");

      if (result.usuarioId) {
        localStorage.setItem("usuarioId", result.usuarioId);
      }

      login(nombreUsuario, contraseña);
      // En vez de navegar de inmediato, abrimos el modal de bienvenida.
      setWelcomeModal(true);
    } catch (error) {
      console.error("Error en el login:", error);
      setErrorMessage("Error al iniciar sesión después del registro.");
    }
  };

  const handleModalClose = () => {
    setWelcomeModal(false);
    navigate("/");
  };

  return (
    <div className="register-modern-container" style={{ fontFamily: "Comorant" }}>
      <h2 className="register-modern-title" style={{ fontStyle: "italic" }}>Crear Cuenta</h2>
      {errorMessage && <p className="register-modern-error-message">{errorMessage}</p>}
      <form onSubmit={handleRegister} className="register-modern-form">
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
        <div className="input-group">
          <label htmlFor="numeroTelefono">Teléfono</label>
          <input
            type="tel"
            id="numeroTelefono"
            placeholder="Ingresa tu número de teléfono"
            value={numeroTelefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
            required
          />
        </div>

        <div className="input-group notifications-group">
          <input
            type="checkbox"
            id="notificationsCheckbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
          />
          <label style={{ fontSize: "2.5vh", fontFamily: "Comorant", fontStyle: "italic" }} htmlFor="notificationsCheckbox">
            Habilita tus Notificaciones, recordamos tus citas por ti
          </label>
        </div>
        <button type="submit" className="register-modern-button" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <Modal 
        isOpen={welcomeModal} 
        onClose={handleModalClose} 
        title="Bienvenido"
        Body={`¡Bienvenido ${nombreUsuario}! Gracias por registrarte en nuestro sistema.`}
      />
    </div>
  );
}
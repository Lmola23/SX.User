// RegisterModern.jsx - (No changes needed here for icon positioning structure)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/AuthProvider/AuthProvider.jsx";
import { requestNotificationPermission } from "../../../firebaseconf.js";
import Modal from "../../Modal/Modal.jsx";
import "./Register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function RegisterModern() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [welcomeModal, setWelcomeModal] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setTelefonoError("");
    setIsLoading(true);

    if (!nombreUsuario || !contraseña || !numeroTelefono) {
      setErrorMessage("Todos los campos son obligatorios.");
      setIsLoading(false);
      return;
    }

    // Validación de la contraseña
    if (contraseña.length < 4) {
      setErrorMessage("La contraseña debe tener al menos 4 caracteres.");
      setIsLoading(false);
      return;
    }
    const passwordRegex = /^[a-zA-Z0-9]+$/; // Solo letras mayúsculas, minúsculas y números
    if (!passwordRegex.test(contraseña)) {
      setErrorMessage("La contraseña solo puede contener letras (mayúsculas y minúsculas) y números, sin espacios ni caracteres especiales.");
      setIsLoading(false);
      return;
    }

    // Validación del número de teléfono
    const telefonoRegex = /^5[0-9]{7}$/; // Corregido a 8 dígitos empezando con 5
    if (!telefonoRegex.test(numeroTelefono)) {
      setTelefonoError("El número de teléfono debe tener 8 dígitos y comenzar con 5.");
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
      const response = await fetch("http://luismola-001-site2.qtempurl.com/api/Cliente/Account/login", {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // Usamos 'register-container' para los estilos generales de página/contenedor
    <div className="register-container" style={{ fontFamily: "Comorant" }}>
      {/* Usamos 'register-modern-card' para la tarjeta del formulario */}
      <div className="register-modern-card">
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

          {/* --- Campo de Contraseña --- */}
          <div className="input-group">
            <label htmlFor="contraseña">Contraseña</label>
            {/* Contenedor para posicionamiento relativo */}
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="contraseña"
                placeholder="Ingresa tu contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
                className="password-input" // Clase específica para padding
              />
              {/* Icono posicionado absolutamente */}
              <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          {/* --- Fin Campo de Contraseña --- */}

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
            {/* Mover el mensaje de error específico del teléfono aquí */}
            {telefonoError && <p className="input-error-message">{telefonoError}</p>}
          </div>

          <div className="input-group notifications-group">
            <input
              type="checkbox"
              id="notificationsCheckbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
            />
            {/* Ajustamos el label para que sea más legible y se ajuste mejor */}
            <label htmlFor="notificationsCheckbox" className="notifications-label">
              Habilita Notificaciones para recordar tus citas
            </label>
          </div>

          <button type="submit" className="register-modern-button" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="register-modern-register-message">
            ¿Ya tienes cuenta? <a href="/login">Inicia Sesión</a>
        </p>
      </div>

      <Modal
        isOpen={welcomeModal}
        onClose={handleModalClose}
        title="¡Bienvenido!"
        Body={`¡Bienvenido ${nombreUsuario}! Gracias por registrarte.`}
      />
    </div>
  );
}
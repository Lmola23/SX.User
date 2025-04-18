// Login.jsx - Refactorizado
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../Utils/AuthProvider/AuthProvider.jsx";
import Modal from "../../Modal/Modal.jsx";
import "./Login.css"; // Asegúrate que la ruta sea correcta
import "./../../../Style/fonts.css"; // Asegúrate que la ruta sea correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const from = location.state?.from?.pathname || "/";

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!nombreUsuario || !contraseña) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    // Mantenemos la validación básica aquí también por consistencia y feedback rápido
    if (contraseña.length < 4) {
      setErrorMessage("La contraseña debe tener al menos 4 caracteres.");
      return;
    }
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (!passwordRegex.test(contraseña)) {
      setErrorMessage("Formato de contraseña inválido."); // Mensaje más genérico para login
      return;
    }

    try {
      // El login de useAuth ya debería manejar la lógica de credenciales
      const result = await login(nombreUsuario, contraseña);
      if (result.success) {
        if (result.usuarioId) {
          localStorage.setItem("usuarioId", result.usuarioId);
        }
        setModalOpen(true); // Abre el modal de éxito
      } else {
        // Muestra el mensaje de error específico del backend si está disponible
        setErrorMessage(result.message || "Nombre de usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setErrorMessage("Error inesperado. Inténtalo de nuevo.");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate(from, { replace: true }); // Redirige después de cerrar el modal
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // Usamos 'login-container' para los estilos generales
    <div className="login-container" style={{ fontFamily: "Comorant" }}>
      {/* Usamos 'login-modern-card' para la tarjeta del formulario */}
      <div className="login-modern-card">
        <h2 className="login-modern-title" style={{ fontStyle: "italic" }}>Iniciar Sesión</h2>
        {/* Mostramos el mensaje de error general aquí */}
        {errorMessage && <p className="login-modern-error-message">{errorMessage}</p>}
        <form onSubmit={handleLoginSubmit} className="login-modern-form">
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

          {/* --- Campo de Contraseña (estructura idéntica a Register) --- */}
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

          <button type="submit" className="login-modern-button">
            Iniciar Sesión
          </button>
        </form>

        {/* Mensaje para ir al registro */}
        <p className="login-modern-register-message">
          ¿No tienes cuenta? <Link to="/register">Toca aquí para crearla</Link>
        </p>
      </div>

      {/* Modal de bienvenida/éxito */}
      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title="¡Inicio de Sesión Exitoso!"
        Body={`¡Bienvenido de nuevo, ${nombreUsuario}!`}
      />
    </div>
  );
}
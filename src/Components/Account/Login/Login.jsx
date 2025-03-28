import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../Utils/AuthProvider/AuthProvider.jsx";
import Modal from "../../Modal/Modal.jsx";
import "./Login.css";
import "./../../../Style/fonts.css";

export default function Login() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Si se viene de una ruta protegida, la guardamos; sino redirijimos a "/"
  const from = location.state?.from?.pathname || "/";

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
        if (result.usuarioId) {
          localStorage.setItem("usuarioId", result.usuarioId);
        }
        // Abre el modal de éxito de login
        setModalOpen(true);
      } else {
        setErrorMessage(result.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setErrorMessage("Error inesperado durante el inicio de sesión.");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate(from, { replace: true });
  };

  return (
    <div className="login-modern-container" style={{ fontFamily: "Comorant" }}>
      <h2 className="login-modern-title">Iniciar Sesión</h2>
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
      <p className="login-modern-register-message">
        ¿No tienes cuenta? <Link to="/register">Toca aquí para crearla</Link>
      </p>
      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title="Login Correcto"
        Body={`¡Bienvenido ${nombreUsuario}! Has iniciado sesión exitosamente.`}
      />
    </div>
  );
}
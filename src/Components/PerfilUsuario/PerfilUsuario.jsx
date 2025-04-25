import React, { useState, useEffect } from "react";
import "./PerfilUsuario.css";
import calendarioPerfilImg from "../../assets/PerfilImg/calendarioImgPeril.png";
import "./../../Style/fonts.css";
import Modal from "../Modal/Modal.jsx";
import { 
  FaCalendarCheck, FaTimes, FaExchangeAlt, FaEye, FaEyeSlash,
  FaClock, FaBell, FaUsers, FaHeart, FaPaperPlane,
  FaChevronUp, FaChevronDown, FaKey 
} from 'react-icons/fa';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [politicasVisible, setPoliticasVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(Notification.permission === "granted");
  const [modalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const respuesta = await fetch(
          `https://luismola-001-site3.qtempurl.com/api/ClientePerfil/${localStorage.getItem("usuarioId")}`,
          {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!respuesta.ok) throw new Error("Error al obtener los datos del usuario");
        const datos = await respuesta.json();
        setUsuario(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setTimeout(() => setLoadingAnimation(false), 600);
      }
    };

    fetchUsuario();
  }, []);

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    const usuarioId = localStorage.getItem("usuarioId");
    if (!feedback.trim() || !usuarioId) return;

    try {
      const response = await fetch(
        "https://luismola-001-site3.qtempurl.com/api/ClientePerfil/createOpinion",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            usuarioId,
            opinion: feedback,
            fechaOpinion: new Date().toISOString()
          }),
        }
      );

      if (!response.ok) throw new Error("Error al enviar el feedback");
      
      setFeedback("");
      setModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const enableNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === "granted");
    } catch (error) {
      console.error("Error al solicitar permisos:", error);
    }
  };

  if (loading || loadingAnimation) {
    return <div className="loading-screen"><div className="loader"></div></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!usuario) {
    return <div className="error-message">No se encontró el usuario</div>;
  }

  return (
    <div className="perfil-container" style={{fontFamily:"Comorant"}}>
      <div className="perfil-header">
        <h2 className="perfil-title">
          Bienvenido, <span className="username">{usuario?.nombreUsuario}</span>
        </h2>
      </div>

      <div className="perfil-card">
        <div className="user-info-section">
          <div className="password-section">
            <h3 className="section-title">
              <FaKey /> Información de Seguridad
            </h3>
            <div className="password-display">
              <span className="password-label">Contraseña:</span>
              <div className="password-value">
                {showPassword ? usuario?.contraseña : '••••••••'}
                <button 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {localStorage.getItem("CitaPendiente") === "true" && (
          <div className="appointment-section">
            <img src={calendarioPerfilImg} alt="imagenDeUncalendario" />
            <h3 className="section-title">
              <FaCalendarCheck /> Tu Próxima Cita
            </h3>
            <div className="appointment-card">
              <div className="appointment-info">
                <p className="appointment-date">
                  <FaClock />
                  <span>{usuario?.fechaCita}</span>
                </p>
              </div>
              <div className="appointment-actions">
                <a 
                  href={`https://wa.me/+53 5 5890908?text=Hola,%20deseo%20cancelar%20mi%20cita.`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="action-button cancel"
                >
                  <FaTimes /> Cancelar Cita
                </a>
                <a 
                  href={`https://wa.me/+53 5 5890908?text=Hola,%20deseo%20cambiar%20el%20día%20de%20mi%20cita.`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="action-button reschedule"
                >
                  <FaExchangeAlt /> Cambiar Día
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="feedback-section">
          <h3 className="section-title">
            <FaPaperPlane /> Tu Opinión es Importante
          </h3>
          <form onSubmit={handleFeedbackSubmit} className="feedback-form">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Comparte tu experiencia con nosotros..."
              className="feedback-input"
              rows="4"
            />
            <button type="submit" className="submit-button">
              <FaPaperPlane /> Enviar Feedback
            </button>
          </form>
        </div>

        <div className="policies-section"> 
          <div className={`policies-content ${politicasVisible ? 'visible' : ''}`}>
            <div className="policy-list">
              <h4 className="policy-title">Políticas Importantes:</h4>
              <ul>
                <li><FaClock /> Respeta los horarios programados</li>
                <li><FaBell /> Notifica cambios con anticipación</li>
                <li><FaUsers /> Sigue las indicaciones del personal</li>
                <li><FaHeart /> Mantén un ambiente respetuoso</li>
              </ul>
            </div>
          </div>
        </div>

        {!notificationsEnabled && (
          <div className="notifications-section">
            <button 
              className="enable-notifications"
              onClick={enableNotifications}
            >
              <FaBell /> Activar Notificaciones
            </button>
          </div>
        )}
      </div>

      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="¡Gracias por tu opinión!"
        body="Tu feedback nos ayuda a mejorar nuestros servicios"
      />
    </div>
  );
};

export default PerfilUsuario;
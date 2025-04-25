import React, { useState, useEffect } from "react";
import "./PerfilUsuario.css";
import calendarioPerfilImg from "../../assets/PerfilImg/calendarioImgPeril.png";
import "./../../Style/fonts.css";
import Modal from "../Modal/Modal.jsx"; // Ajusta la ruta si es necesario

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [politicasVisible, setPoliticasVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(Notification.permission === "granted");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const respuesta = await fetch(`https://luismola-001-site3.qtempurl.com/api/ClientePerfil/${localStorage.getItem("usuarioId")}`);
        if (!respuesta.ok) throw new Error("Error al obtener los datos del usuario");
        const datos = await respuesta.json();
        console.log(datos);
        setUsuario(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    const usuarioId = localStorage.getItem("usuarioId") || "";
    const dataToSend = {
      usuarioId,
      opinion: feedback,
      fechaOpinion: new Date().toISOString()
    };

    try {
      const response = await fetch("https://luismola-001-site3.qtempurl.com/api/ClientePerfil/createOpinion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });
      if (!response.ok) throw new Error("Error al enviar la opinión");
      console.log("Feedback enviado:", dataToSend);
      setFeedback("");
      setModalOpen(true);
    } catch (error) {
      console.error("Error al enviar la opinión:", error);
      alert("Error al enviar la opinión: " + error.message);
    }
  };

  const togglePoliticas = () => {
    setPoliticasVisible(!politicasVisible);
  };

  const enableNotifications = () => {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        setNotificationsEnabled(true);
        console.log("Notificaciones habilitadas");
      }
    });
  };

  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!usuario) return <p className="error">No se encontraron datos del usuario.</p>;

  const whatsappURLCancelar = `https://wa.me/+53 5 5890908?text=Hola,%20deseo%20cancelar%20mi%20cita.`;
  const whatsappURLCambiar = `https://wa.me/+53 5 5890908?text=Hola,%20deseo%20cambiar%20el%20día%20de%20mi%20cita.`;
  const citaPendiente = localStorage.getItem("CitaPendiente");
  console.log("Valor de localStorage CitaPendiente:", citaPendiente);
  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h2 className="perfil-title">
          Bienvenido, <span className="username">{usuario?.nombreUsuario}</span>
        </h2>
      </div>

      <div className="perfil-card">
        <div className="perfil-info">
          <div className="perfil-calendar">
            <img src={calendarioPerfilImg} alt="Calendario" className="calendar-image" />
          </div>

          <div className="appointment-status">
            {citaPendiente === "true" ? (
              <div className="appointment-active">
                <div className="appointment-date">
                  <i className="fas fa-calendar-check"></i>
                  <p>Tu próxima cita: <span>{usuario.fechaCita}</span></p>
                </div>
                <div className="appointment-actions">
                  <a href={whatsappURLCancelar} target="_blank" rel="noopener noreferrer" className="action-button cancel">
                    <i className="fas fa-times"></i> Cancelar Cita
                  </a>
                  <a href={whatsappURLCambiar} target="_blank" rel="noopener noreferrer" className="action-button reschedule">
                    <i className="fas fa-exchange-alt"></i> Cambiar Día
                  </a>
                </div>
              </div>
            ) : (
              <div className="no-appointment">
                <p>No tienes citas pendientes</p>
                <span className="emoji">✨</span>
              </div>
            )}
          </div>
        </div>

        <div className="feedback-section">
          <h3 className="feedback-title">Tu opinión es importante</h3>
          <form onSubmit={handleFeedbackSubmit} className="feedback-form">
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Comparte tu experiencia con nosotros..."
              className="feedback-input"
            />
            <button type="submit" className="submit-button">
              <i className="fas fa-paper-plane"></i> Enviar
            </button>
          </form>
        </div>

        <div className="policies-section">
          <button className="policies-toggle" onClick={togglePoliticas}>
            {politicasVisible ? 
              <><i className="fas fa-chevron-up"></i> Políticas de Usuario</> : 
              <><i className="fas fa-chevron-down"></i> Políticas de Usuario</>
            }
          </button>
          <div className={`policies-content ${politicasVisible ? "visible" : ""}`}>
            <div className="policy-list">
              <h4>Políticas importantes:</h4>
              <ul>
                <li><i className="fas fa-clock"></i> Respeta los horarios</li>
                <li><i className="fas fa-bell"></i> Notifica cambios con tiempo</li>
                <li><i className="fas fa-users"></i> Sigue las instrucciones</li>
                <li><i className="fas fa-heart"></i> Mantén el respeto</li>
              </ul>
            </div>
          </div>
        </div>

        {!notificationsEnabled && (
          <div className="notifications-section">
            <button className="enable-notifications" onClick={enableNotifications}>
              <i className="fas fa-bell"></i> Activar Notificaciones
            </button>
          </div>
        )}
      </div>

      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title="¡Gracias por tu opinión!"
        Body="Tu feedback nos ayuda a mejorar"
      />
    </div>
  );
};

export default PerfilUsuario;
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
    <div className="perfil-container" style={{ fontFamily: "Comorant" }}>
      <h2>{usuario.nombreUsuario}</h2>
      <p><strong>Contraseña:</strong> {usuario.contraseña}</p>
      <div className="perfil-imgCalender-container">
        <img src={calendarioPerfilImg} alt="Calendario" />
      </div>
      {citaPendiente=="true"? 
      (
        <>
          <p className="cita-pendiente" style={{ width: "80%", margin: "auto", marginBottom:"2vh" }}>
            Cita reservada: {usuario.fechaCita}
          </p>
          <p>¿Deseas cancelar o cambiar el día de tu cita?</p>
          <div className="botones-container">
            <a href={whatsappURLCancelar} target="_blank" rel="noopener noreferrer" className="boton-whatsapp-cancelar">
              Cancelar Cita
            </a>
            <a href={whatsappURLCambiar} target="_blank" rel="noopener noreferrer" className="boton-whatsapp-cambiar">
              Cambiar Día
            </a>
          </div>
        </>
      ) : (
        <>
        <p className="mensaje-bienvenida"> No tienes citas pendientes. ¡Disfruta tu día!</p>
        </>
      )}

      <div className="feedback-form">
        <h3 style={{ marginBottom: "2vh" }}>
          ¡Tu opinión es importante para nosotros! ✨ Déjanos tu testimonio sobre tu experiencia en nuestro salón y  nuestra página web. 💕
        </h3>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            style={{ width: "85%", marginBottom: "1vh" }}
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Escribe tu opinión aquí..."
          ></textarea>
          <button type="submit" style={{ marginBottom: "3vh" }}>Enviar Opinión</button>
        </form>
      </div>

      <div className="politicas-container" style={{ width: "80%", margin: "auto", marginBottom: "5vh" }}>
        <button className="politicas-button" onClick={togglePoliticas}>
          {politicasVisible ? "Ocultar Políticas de Consumidor⬆️" : "Mostrar Políticas de Consumidor⬇️"}
        </button>
        <div className={`politicas-text ${politicasVisible ? "visible" : ""}`}>
          <p>
            Como cliente, es importante que sigas nuestras políticas para garantizar una experiencia positiva para todos.
            Si no cumples con estas políticas, tu cuenta podría ser bloqueada:
          </p>
          <ol style={{ fontSize: "1.2rem", marginBottom: "2vh" }}>
            <li>1-Respeta los horarios de tus citas.</li>
            <li>2-Notifica con antelación si necesitas cancelar o cambiar una cita.</li>
            <li>3-Sigue las instrucciones del personal del salón.</li>
            <li>4-Trata a todos con respeto y cortesía.</li>
          </ol>
        </div>
      </div>

      {!notificationsEnabled && (
        <div className="notifications-container" style={{ marginBottom: "5vh" }}>
          <p>Se te notificará un día antes de tu cita.</p>
          <button className="notifications-button" onClick={enableNotifications}>
            Activar Notificaciones
          </button>
        b</div>
      )}

      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Opinión enviada"
        Body="¡Opinión enviada con éxito!"
      />
    </div>
  );
};

export default PerfilUsuario;
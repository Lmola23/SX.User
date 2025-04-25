import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "./MenuReservacion.css";
import "./../../Style/fonts.css";
import "./../../Style/fontNumber.css";
import Modal from "../Modal/Modal";
import CitaPendienteImg from './../../assets/ReservaImg/CitaPendiente.jpg';

registerLocale("es", es);

const NuevoSelectorDeCitas = () => {
  const hoy = new Date();
  const navigate = useNavigate();
  
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [diasDisponibles, setDiasDisponibles] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState(hoy);
  const [servicios, setServicios] = useState([]);
  const [citaPendiente, setCitaPendiente] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  const whatsappURL = "https://wa.me/+53 5 5890908?text=Hola,%20necesito%20asistencia%20con%20una%20reserva.";

  const formatearFecha = (fecha) => fecha.toISOString().split("T")[0];

  useEffect(() => {
    const citaStorage = localStorage.getItem("CitaPendiente");
    setCitaPendiente(citaStorage === "true");
  }, []);

  useEffect(() => {
    const obtenerDiasDisponibles = async () => {
      try {
        const respuesta = await fetch("https://luismola-001-site3.qtempurl.com/api/Cliente/Disponibilidad");
        if (!respuesta.ok) throw new Error("Error al obtener la disponibilidad");
        const datos = await respuesta.json();
        setDiasDisponibles(Array.isArray(datos) ? datos : []);
      } catch (error) {
        console.error("Error al obtener los días disponibles:", error);
      }
    };
    obtenerDiasDisponibles();
  }, [mesSeleccionado]);

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const respuesta = await fetch("https://luismola-001-site3.qtempurl.com/api/Cliente/Servicio");
        if (!respuesta.ok) throw new Error("Error al obtener los servicios");
        const datos = await respuesta.json();
        setServicios(Array.isArray(datos) ? datos : []);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };
    obtenerServicios();
  }, []);

  const manejarCambioDeFecha = (fecha) => {
    const diaEncontrado = diasDisponibles.find(
      (d) => formatearFecha(new Date(d.fecha)) === formatearFecha(fecha)
    );
    setDiaSeleccionado(fecha);
    setHoraSeleccionada(null);
    setHorasDisponibles(diaEncontrado ? diaEncontrado.hora || [] : []);
  };

  const manejarCambioDeMes = (fecha) => {
    setMesSeleccionado(fecha);
    setDiaSeleccionado(null);
    setHoraSeleccionada(null);
    setHorasDisponibles([]);
  };

  const alternarServicio = (id) => {
    setServiciosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const esDiaDisponible = (fecha) =>
    diasDisponibles.some(
      (d) => formatearFecha(new Date(d.fecha)) === formatearFecha(fecha)
    );

    const confirmarCita = async () => {
      if (citaPendiente) {
        alert("Usted ya tiene una cita pendiente. Si desea reservar otra, contacte a la administradora.");
        return;
      }
      
      const usuarioId = localStorage.getItem("usuarioId");
      if (!usuarioId) {
        alert("Usuario no autenticado.");
        return;
      }
      if (!diaSeleccionado || !horaSeleccionada || serviciosSeleccionados.length === 0) {
        alert("Debe seleccionar un día, una hora y al menos un servicio.");
        return;
      }
      const diaEncontrado = diasDisponibles.find(
        (d) => formatearFecha(new Date(d.fecha)) === formatearFecha(diaSeleccionado)
      );
      if (!diaEncontrado) {
        alert("El día seleccionado no es válido.");
        return;
      }
      const horaEncontrada = horasDisponibles.find((h) => h.id === horaSeleccionada);
      if (!horaEncontrada) {
        alert("La hora seleccionada no es válida.");
        return;
      }
    
      // Objeto que se enviará a la API
      const cita = {
        usuarioId: usuarioId,
        fechaReservadaDTO: {
          diaId: diaEncontrado.id,
          horaId: horaEncontrada.id,
        },
        servicioIds: serviciosSeleccionados.map((id) => id)
      };
    
      // Mostrar el JSON por consola
      console.log("JSON a enviar:", cita);
    
      try {
        const respuesta = await fetch("https://luismola-001-site3.qtempurl.com/api/ClienteCitas/ReservarCita", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          credentials: 'include',  // Movido fuera del headers
          body: JSON.stringify(cita),
        });
    
        // Obtener el contenido de la respuesta antes de validar
        const data = await respuesta.json();
    
        if (!respuesta.ok) {
          throw new Error(data.message || "Error al reservar la cita");
        }
    
        // Si llegamos aquí, la cita se creó exitosamente
        localStorage.setItem("CitaPendiente", "true");
        setCitaPendiente(true);
        setModalAbierto(true);
      } catch (error) {
        console.error("Error al reservar la cita:", error);
        alert(error.message || "Error al reservar la cita");
      }
    };
  const handleCerrarModal = () => {
    setModalAbierto(false);
    navigate("/");
  };

  return (
    <div className="containerMenuReservacion" style={{ background: "white", fontFamily: "Comorant" }}>
      {citaPendiente ? (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <img src={CitaPendienteImg} alt="Cita Pendiente" style={{ width: "100%", maxWidth: "400px", borderRadius: "5px",marginBottom:"3vh" }} />
          <p style={{ fontWeight: "bold", fontSize: "3vh",fontFamily:"Comorant" ,fontStyle:"italic",width:"80%",margin:"auto",marginBottom:"3vh"}}>
            Usted ya reservó su cita. Si desea reservar otra, por favor contacte a la administradora del salón.
          </p>
          <a href={whatsappURL} target="_blank" rel="noopener noreferrer">
            <button style={{ padding: "10px 20px", borderRadius: "5px", backgroundColor: "transparent", border: "2px solid #25D366 ", color: "#25D366" }}>
              Contactar por WhatsApp
            </button>
          </a>
        </div>
      ) : (
        <>
          <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "40px", fontStyle: "italic", marginTop: "10vh",marginBottom:"3vh" }}>
            Selecciona el Día
          </h2>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <DatePicker
              selected={diaSeleccionado}
              onChange={manejarCambioDeFecha}
              inline
              filterDate={esDiaDisponible}
              minDate={hoy}
              maxDate={new Date(hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate())}
              dateFormat="dd/MM/yyyy"
              onMonthChange={manejarCambioDeMes}
              openToDate={mesSeleccionado}
              locale="es"
              disabled={citaPendiente}
            />
          </div>

          <h3 style={{ marginTop: "20px", fontStyle: "italic" }}>Selecciona la Hora</h3>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
              flexWrap: "wrap",
              width: "60%",
              justifyContent: "center",
            }}
          >
            {horasDisponibles.length > 0 ? (
              horasDisponibles.map((hora) => (
                <button
                  key={hora.id}
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    backgroundColor: hora.id === horaSeleccionada ? "#ddd" : "white",
                  }}
                  onClick={() => setHoraSeleccionada(hora.id)}
                  className="butonTime"
                  disabled={!hora.estadoDisponible || citaPendiente}
                >
                  {hora.hora}
                </button>
              ))
            ) : (
              <p style={{ color: "red" }}>No hay horas disponibles para este día.</p>
            )}
          </div>

          <h3 style={{ marginTop: "20px" }}>Servicios</h3>
          <div className="containerServicioReserva" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px", }}>
            {servicios.map((servicio) => (
              <button
                key={servicio.id}
                style={{
                  padding: "8px",
                  fontFamily: "Comorant",
                  borderRadius: "5px",
                  border: "1px solid",
                  borderColor: serviciosSeleccionados.includes(servicio.id) ? "red" : "#ddd",
                  color: serviciosSeleccionados.includes(servicio.id) ? "red" : "black",
                }}
                onClick={() => alternarServicio(servicio.id)}
                disabled={citaPendiente}
              >
                {servicio.title}
              </button>
            ))}
          </div>

          <button className="buttonConfirmarCita" onClick={confirmarCita} style={{ marginTop: "20px" }}>
            Confirmar Cita
          </button>
        </>
      )}

      <Modal
        isOpen={modalAbierto}
        onClose={handleCerrarModal}
        title="Cita Reservada"
        Body="Su cita ha sido reservada con éxito. ¡Gracias por confiar en nosotros!"
        />
    </div>
  );
};



export default NuevoSelectorDeCitas;
import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "./MenuReservacion.css";
import "./../../Style/fonts.css";
import "./../../Style/fontNumber.css";

registerLocale("es", es);

const NuevoSelectorDeCitas = () => {
  const hoy = new Date();
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [diasDisponibles, setDiasDisponibles] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState(hoy);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const obtenerDiasDisponibles = async () => {
      try {
        const respuesta = await fetch("https://013d-149-22-84-164.ngrok-free.app/api/Cliente/Disponibilidad");
        if (!respuesta.ok) {
          throw new Error("Error al obtener la disponibilidad");
        }
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
        const respuesta = await fetch("https://013d-149-22-84-164.ngrok-free.app/api/Cliente/Servicio");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los servicios");
        }
        const datos = await respuesta.json();
        setServicios(Array.isArray(datos) ? datos : []);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };

    obtenerServicios();
  }, []);

  const manejarCambioDeFecha = (fecha) => {
    setDiaSeleccionado(fecha);
    setHoraSeleccionada(null);
    const diaEncontrado = diasDisponibles.find(
      (d) => new Date(d.fecha).toISOString().split("T")[0] === fecha.toISOString().split("T")[0]
    );
    setHorasDisponibles(diaEncontrado ? diaEncontrado.horas || [] : []);
  };

  const alternarServicio = (id) => {
    setServiciosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const esDiaDisponible = (fecha) => {
    return diasDisponibles.some(
      (d) => new Date(d.fecha).toISOString().split("T")[0] === fecha.toISOString().split("T")[0]
    );
  };

  const manejarCambioDeMes = (fecha) => {
    setMesSeleccionado(fecha);
    setDiaSeleccionado(null);
    setHorasDisponibles([]);
  };
  const confirmarCita = async () => {
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
      (d) => new Date(d.fecha).toISOString().split("T")[0] === diaSeleccionado.toISOString().split("T")[0]
    );
    if (!diaEncontrado) {
      alert("El día seleccionado no es válido.");
      return;
    }
    const horaEncontrada = horasDisponibles.find((h) => h.hora === horaSeleccionada);
    if (!horaEncontrada) {
      alert("La hora seleccionada no es válida.");
      return;
    }
  
    // Asegúrate de que `serviciosSeleccionados` sea una lista de enteros
    const servicioIds = serviciosSeleccionados.map(id => parseInt(id));
  
    const cita = {
      UsuarioId: usuarioId,
      DiaId: diaEncontrado.id,
      HoraId: horaEncontrada.id,
      ServicioIds: servicioIds,
    };
  
    console.log("Cita a enviar:", JSON.stringify(cita)); // Muestra el JSON que se va a enviar
  
    try {
      const respuesta = await fetch("https://013d-149-22-84-164.ngrok-free.app/api/ClienteReservaCita/Reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cita),
      });
      if (!respuesta.ok) {
        throw new Error("Error al reservar la cita");
      }
      alert("Cita reservada con éxito");
    } catch (error) {
      console.error("Error al reservar la cita:", error);
      alert("Error al reservar la cita");
    }
  };
  

  return (
    <div className="containerMenuReservacion" style={{ background: "white", fontFamily: "Comorant" }}>
      <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "40px", fontStyle: "italic" }}>Selecciona el Día</h2>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <DatePicker
          selected={diaSeleccionado}
          onChange={manejarCambioDeFecha}
          inline
          filterDate={esDiaDisponible}
          minDate={hoy}
          maxDate={new Date(hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate())}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecciona una fecha"
          onMonthChange={manejarCambioDeMes}
          openToDate={mesSeleccionado}
          locale="es"
        />
      </div>
      <h3 style={{ marginTop: "20px", fontStyle: "italic" }}>Selecciona la Hora</h3>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap", width: "60%", justifyContent: "center" }}>
        {horasDisponibles.length > 0 ? (
          horasDisponibles.map((hora) => (
            <button
              key={hora.id}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                backgroundColor: hora.hora === horaSeleccionada ? "#ddd" : "white",
              }}
              onClick={() => setHoraSeleccionada(hora.hora)}
              className="butonTime"
              disabled={!hora.estadoDisponible}
            >
              {hora.hora}
            </button>
          ))
        ) : (
          <p style={{ color: "red" }}>No hay horas disponibles para este día.</p>
        )}
      </div>
      <h3 style={{ marginTop: "20px" }}>Servicios</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
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
          >
            {servicio.title}
          </button>
        ))}
      </div>
      <button className="buttonConfirmarCita"  onClick={confirmarCita}>Confirmar Cita</button>
    </div>
  );
};

export default NuevoSelectorDeCitas;

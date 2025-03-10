import { useState } from "react";
import "./T_Servicio_S.css";
import "./../../../Style/fonts.css";

const ServicioCard = ({ servicio }) => {
  const { Title, Img, Incluye, price, Beneficios, ImgBeneficio } = servicio;
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`card-container ${flipped ? "flipped" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ fontFamily: "Comorant" }}
    >
      <div className="card front">
        <img src={Img} alt={Title} className={`card-image ${hovered ? "hovered" : ""}`} />
        <div className="card-overlay">
          <h3 style={{ fontFamily: "Comorant", fontStyle: "italic", fontWeight: 800 }} className="titleServicio">
            {Title}
          </h3>
          {hovered && (
            <div className="extra-content">
              <h3 style={{ fontSize: "3vh", marginBottom: 0, paddingBottom: 0 }}>Incluye</h3>
              <p
                style={{
                  fontSize: "2vh",
                  width: "85%",
                  textAlign: "center",
                  margin: "auto"
                }}
                className="descriptionServivios"
              >
                {Incluye}
              </p>
              <p className="priceServicio" style={{ fontSize: "2.5vh" }}>
                Precio: {price}
              </p>
              <button style={{ fontFamily: "Comorant" }} className="reserve-button">
                Reservá Online
              </button>
              <button style={{ fontFamily: "Comorant" }} className="benefits-button" onClick={() => setFlipped(true)}>
                Conocer Beneficios
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className="card back"
        style={{
          backgroundImage: `url(${ImgBeneficio})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <div className="card-content" style={{ paddingLeft: "2vh" }}>
          <h3 className="titleBeneficio">Beneficios de {Title}</h3>
          <ul style={{ padding: 0, fontSize: "2vh" , marginLeft:"20px"}} className="descriptionBeneficioServicio">
            {Beneficios.map((beneficio, index) => (
              <li
                style={{
                  marginBottom: "1vh",
                  position: "relative",
                  zIndex: 2,
                  color: "white"
                }}
                key={index}
              >
                {beneficio}
              </li>
            ))}
          </ul>
          <button
            style={{ fontFamily: "Comorant", fontSize: "2.5vh" }}
            className="back-button"
            onClick={() => setFlipped(false)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicioCard;

import { useState } from "react";
import "./T_Servicio_S.css";
import "./../../../Style/fonts.css";

const ServicioCard = ({ servicio }) => {
  const { Title, Img, Incluye, price, Beneficios, ImgBeneficio } = servicio;
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const handleReserve = () => {
    // URL personalizada de WhatsApp con el servicio específico
    const whatsappURL = `https://wa.me/+5355890908?text=Hola%20quiero%20reservar%20una%20cita%20para%20${encodeURIComponent(Title)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div 
      className={`card-container ${flipped ? "flipped" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{fontFamily:"Cormorant"}}
    >
      {/* Front Card */}
      <div className="card front">
        <img 
          src={Img} 
          alt={Title} 
          className={`card-image ${hovered ? "hovered" : ""}`} 
        />
        <div className="card-overlay">
          <div className="card-header">
            <h3 className="titleServicio">
              {Title}
            </h3>
          </div>

          {hovered && (
            <div className="card-content">
              <div className="service-details">
                <h4 className="content-title">Incluye</h4>
                <p className="description">
                  {Incluye}
                </p>
                <p  translate="no"className="price">
                  Precio: {price}$
                </p>
              </div>

              <div className="button-group">
                <button 
                  className="reserve-button"
                  onClick={handleReserve}
                >
                  Reservar por WhatsApp
                </button>
                <button 
                  className="benefits-button"
                  onClick={() => setFlipped(true)}
                >
                  Conocer Beneficios
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back Card */}
      <div className="card back">
        <div 
          className="back-overlay"
          style={{
            backgroundImage: `url(${ImgBeneficio})`
          }}
        >
          <div className="back-content">
            <h3 className="back-title">
              Beneficios de {Title}
            </h3>
            <div className="benefits-list">
              {Beneficios.map((beneficio, index) => (
                <div key={index} className="benefit-item">
                  {beneficio}
                </div>
              ))}
            </div>
            <button
              className="back-button"
              onClick={() => setFlipped(false)}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicioCard;
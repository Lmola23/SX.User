import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./T_Servicio_S.css";
import "./../../../Style/fonts.css";

const ServicioCard = ({ servicio }) => {
  const { Title, Img, Incluye, price, Beneficios, ImgBeneficio } = servicio;
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate('/booking');
  };

  return (
    <div 
      className={`card-container ${flipped ? "flipped" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{fontFamily:"Comorant"}}
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
                <p className="price">
                  Precio: {price}$
                </p>
              </div>

              <div className="button-group">
                <button 
                  className="reserve-button"
                  onClick={handleReserve}
                >
                  Reservá Online
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
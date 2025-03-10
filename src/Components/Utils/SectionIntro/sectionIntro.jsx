import { useEffect, useState } from "react";
import "./sectionIntro.css";
import './../../../Style/fonts.css';

export default function SectioniIntro({ title, textIntro, ImgIntro }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 800);
  }, []);

  return (
    <div className="servicios-container" style={{ fontFamily: "Comorant" }} >
      < div className="background" style={{ backgroundImage: `url(${ImgIntro})`, backgroundSize: "cover" }}></div>

      {/* Contenido con animación */}
      <div className={`texto ${isVisible ? "visible" : ""}`} >
        <h2 className="titleServicioSection">{title}</h2>
        <p className="textIntroServicioSection">
          {textIntro}
        </p>
      </div>
    </div >
  );
}


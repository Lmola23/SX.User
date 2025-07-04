import ImageFullScreenViewer from "../../Components/ImageFullScreenVIewer/ImageFullScreenViewer.jsx";
import React, { useEffect, useState } from "react";
import { SectionIntro } from "../../Components/Utils/index.js";
import ImgInicial from "../../assets/Galeria/fondo.png";
const getFotosFromApi = async () => {
  try {
    const response = await fetch('https://luismola-001-site3.qtempurl.com/api/ImgGaleria');
    const data = await response.json();
    console.log("Datos obtenidos de la API:", data);
    return data.map((photo) => ({
      id: photo.id,
      urlImg: photo.urlImg,
    }));
  } catch (error) {
    console.error("Error al obtener las fotos:", error);
    return [];
  }
}




export default function Galeria() {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    const fetchFotos = async () => {
      const data = await getFotosFromApi();
      setFotos(data);
    };
    fetchFotos();
  }, []);

  return (
    <>
      <SectionIntro
        title="Resultados reales, belleza visible"
        textIntro="Explora nuestra galería de transformaciones antes y después, donde verás el impacto de nuestros tratamientos faciales y corporales."
        ImgIntro={ImgInicial}
      />
      <div className="galeria-container">
        <h1 style={{ fontSize: "5vw", textAlign: "center" }}> Galería de Imágenes</h1>
        <div
          className="galeria-flex"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {fotos.map((foto) => (
            <div key={foto.id} style={{ flex: "0 1 200px" }}>
              <ImageFullScreenViewer imageUrl={foto.urlImg} alt={`Imagen ${foto.id}`} />
            </div>
          ))}
        </div>
      </div>
    </>

  );
}
import { useState, useEffect } from 'react';
import {T_Servicio_S} from './../../Components/Targetas/index.js';
import './../../Style/fonts.css';
import './Servicio.css';
import { SectionIntro } from './../../Components/Utils/index.js';
import ImgIncial from './../../assets/ServicioImg/ImgPresentServicio.png';

const getServicesFromAPI = async () => {
  try {
    const response = await fetch('https://luismola-001-site2.qtempurl.com/api/Administrador/Servicio');
    const data = await response.json();
    return data.map((service) => ({
      id: service.id,
      Title: service.title,
      Img: service.urlImg,
      Incluye: service.incluye,
      price: service.precio,
      Beneficios: service.beneficios.split(',').map(b => b.trim()),
      ImgBeneficio: service.urlImgBeneficio
    }));
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    return [];
  }
};

export default function Servicio() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      const servicesFromAPI = await getServicesFromAPI();
      console.log("Servicios desde API:", servicesFromAPI);
      setServices(servicesFromAPI);
    };
    loadServices();
  }, []);

  return (
    <div className='containerServicioSection'>
      <SectionIntro
        title="Realza tu Belleza con Nuestros Tratamientos Exclusivos"
        textIntro="En Salón Xanadu, combinamos técnicas innovadoras con un toque personalizado para brindarte una experiencia única. Descubre nuestros servicios diseñados para hacerte brillar en cada ocasión."
        ImgIntro={ImgIncial}
      />
      <div className='servicios-list'>
        {services.map((service) => (
          <T_Servicio_S key={service.id} servicio={service} />
        ))}
      </div>
    </div>
  );
}

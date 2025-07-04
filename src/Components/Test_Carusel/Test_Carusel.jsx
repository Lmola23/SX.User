import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Ters_Carusel.css';

const TestimoniosCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 10 segundos
    pauseOnHover: true,
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const testimonios = [
    {
      texto: "Desde que descubrí En Salón Xanadu, mi piel ha cambiado por completo. Los tratamientos son excepcionales y los resultados, sorprendentes. Además, los productos que compré para usar en casa son de una calidad increíble. ¡Recomiendo este lugar a todos mis amigos y familiares!",
      nombre: "María G."
    },
    {
      texto: "¡Me encanta Salón Xanadu! Siempre salgo de allí sintiéndome renovada y con la piel radiante. Los profesionales son muy amables y cualificados. ¡Lo recomiendo al 100%!",
      nombre: "Ana S."
    },
    {
      texto: "Salón Xanadu es mi lugar favorito para cuidarme. Los tratamientos son personalizados y se adaptan a mis necesidades. ¡Los resultados son visibles desde la primera sesión!",
      nombre: "Laura P."
    }
  ];

  return (
    <div className="testimoniosCarousel" style={{ fontFamily: "Comorant" }}>
      <Slider {...settings}>
        {testimonios.map((testimonio, index) => (
          <div key={index} className="testimonio">
            <p className='testimonioText'>"{testimonio.texto}"</p>
            <div className="testimonio-autor">
              <div className="testimonio-nombre">{testimonio.nombre}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimoniosCarousel;

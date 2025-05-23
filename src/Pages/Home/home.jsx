import { useState, useEffect } from 'react';
import './home.css';
import { Link } from "react-router-dom";
import './../../Style/fonts.css';
import { T_Nosotros_H, T_Servicio_H } from './../../Components/Targetas/index.js';
import Img from './../../Utiles/imgHome.js';
import ImgProduct from './../../assets/HomeImg/imgProductoHome.jpeg';
import Test_Carusel from './../../Components/Test_Carusel/Test_Carusel.jsx';
import { FadeInSection } from "../../Components/Utils/index.js";
import { useAuth } from './../../Components/Utils/AuthProvider/AuthProvider.jsx';
import PageWrapper from '../../Components/Utils/PageWraper/PageWraper';
import SEO from '../../Components/Utils/SEO/SEO';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [isContentLoading, setIsContentLoading] = useState(true);

  useEffect(() => {
    // Simular carga de recursos
    Promise.all([
      // Precarga de imágenes principales
      new Promise(resolve => {
        const img = new Image();
        img.src = ImgProduct;
        img.onload = resolve;
      }),
      // Precarga de imágenes de servicios
      ...Object.values(Img).map(imgSrc => 
        new Promise(resolve => {
          const img = new Image();
          img.src = imgSrc;
          img.onload = resolve;
        })
      )
    ]).then(() => {
      setIsContentLoading(false);
    });
  }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Salón Xanadu",
    "image": "http://salonxanadu.com/logo.jpg",
    "description": "Salón de belleza y estética en Las Tunas, Cuba. Especialistas en tratamientos faciales, cuidado corporal y de la piel.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ángel Amejeira #29 e/ Juan Gualberto Gómez y Camilo Cienfuegos",
      "addressLocality": "Puerto Padre",
      "addressRegion": "Las Tunas",
      "postalCode": "77210",
      "addressCountry": "CU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.950000",
      "longitude": "-77.210000"
    },
    "url": "https://salonxanadu.com",
    "telephone": "55890908",
    "priceRange": "1000-3000",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Cliente Satisfecho"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Excelente servicio y atención personalizada"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "16:00"
    },
    "sameAs": [
      "https://www.facebook.com/share/1AXXj94qRM/?mibextid=wwXIfr",
      "https://www.instagram.com/salon_xanadu?igsh=enE4dXgwZm1xbGVj&utm_source=qr"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Belleza",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Limpieza facial profunda",
            "description": "Eliminamos impurezas, revitalizamos tu piel y te dejamos con un rostro radiante y saludable.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Salón Xanadu"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Extensiones de Pestañas",
            "description": "Transformar tu mirada nunca fue tan fácil. Look espectacular y natural.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Salón Xanadu"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Micropigmentación de Cejas y Labios",
            "description": "Técnica avanzada de micropigmentación para un look impecable y duradero.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Salón Xanadu"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Blanqueamiento Dental Profesional",
            "description": "Tratamiento de blanqueamiento dental seguro y efectivo.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Salón Xanadu"
            }
          }
        }
      ]
    }
  };

  return (
    <>
    <PageWrapper>
      <SEO 
        title="Salón Xanadu - Belleza y Estética en Las Tunas, Cuba | Tratamientos Faciales y Corporales"
        description="Salón de belleza y estética en Las Tunas, Cuba. Especialistas en tratamientos faciales, cuidado corporal y de la piel. Ofrecemos limpieza facial, extensiones de pestañas, micropigmentación y más. ¡Reserva tu cita hoy!"
        keywords="salón de belleza Las Tunas, estética facial Cuba, limpieza facial, extensiones de pestañas, micropigmentación, blanqueamiento dental, tratamientos faciales, cuidado corporal, spa Las Tunas, belleza Cuba, peluquería Las Tunas, manicure Las Tunas, pedicure Las Tunas, masajes faciales, hidratación facial, exfoliación corporal, masajes corporales, tratamientos anti-edad, cuidado de la piel, depilación láser, maquillaje profesional, peinados, tintes, alisados, tratamientos capilares, spa facial, masajes relajantes, tratamientos anti-celulitis, drenaje linfático, mascarillas faciales, tratamientos para el acné, rejuvenecimiento facial, lifting facial, microdermoabrasión, peeling facial"
        ogTitle="Salón Xanadu - Belleza y Estética en Las Tunas, Cuba"
        ogDescription="Descubre los mejores tratamientos de belleza y estética en Las Tunas. Especialistas en faciales, corporales y más. ¡Reserva tu cita hoy!"
        ogImage="https://salonxanadu.com/images/main-image.jpg"
        ogUrl="https://salonxanadu.com"
        twitterCard="summary_large_image"
        twitterTitle="Salón Xanadu - Belleza y Estética en Las Tunas, Cuba"
        twitterDescription="Descubre los mejores tratamientos de belleza y estética en Las Tunas. Especialistas en faciales, corporales y más. ¡Reserva tu cita hoy!"
        twitterImage="https://salonxanadu.com/images/main-image.jpg"
        schemaMarkup={schemaMarkup}
        canonicalUrl="https://salonxanadu.com"
        robots="index, follow"
        viewport="width=device-width, initial-scale=1.0"
        language="es"
      />
      <div 
        className='containerHome' 
        style={{ fontFamily: "Comorant" }}
        data-loading={isContentLoading}
      >
        <div className='containerPresen'>
          <FadeInSection>
            <h2 className='titleHome' style={{ fontFamily: "Comorant", fontWeight: 800, fontStyle: "italic" }}>
              Salón Xanadu Estética Facial y Corporal
            </h2>
            <p className='textDescripcionInicialHome'>
              En nuestro salón , cada cliente es nuestra estrella. Realzamos tu belleza única con tratamientos exclusivos y atención personalizada.
            </p>
            <div className='containerButtonInicialHome'>
              {isAuthenticated ? (
                <Link className='btnCommon btnConocer' to='/services'>
                  Conocer Servicios
                </Link>
              ) : (
                <div className='btnGroup'>
                  <Link className='btnCommon btnCrear' to='/register'>
                    Crear Cuenta
                  </Link>
                  <Link className='btnCommon btnIniciar' to='/login'>
                    Iniciar Sección
                  </Link>
                </div>
              )}
            </div>
          </FadeInSection>
        </div>
            <h3 className='titleHomeEscogernos' style={{ fontFamily: "Comorant", fontWeight: 800, fontStyle: "italic" }}>
              ¿Por qué escogernos?
            </h3>
        <div className='containerEscogenos'>
            <T_Nosotros_H
              Title="En Salón Xanadu"
              description="Ofrecemos un cuidado integral y personalizado. Aquí encontrarás tratamientos corporales y faciales de última generación, un entorno acogedor y un equipamiento moderno."
              imgUrl={Img.img1}
            />

            <T_Nosotros_H
              Title="Atención Personalizada"
              description="Cada cliente es único. Nuestro equipo de expertos te brindará una atención personalizada, adaptando cada tratamiento a tus necesidades específicas."
              imgUrl={Img.img2}
            />

            <T_Nosotros_H
              Title="Productos exclusivos"
              description="No solo te ofrecemos tratamientos de primera calidad, sino también una selección de productos exclusivos para que puedas llevar el cuidado personal y la belleza a casa. Nuestros productos están diseñados para complementar tus tratamientos y ayudarte a mantener los resultados espectaculares."
              imgUrl={Img.img3}
            />

            <T_Nosotros_H
              Title="Explora Nuestro Blog de Cuidado de la piel y Bienestar personal!"
              description="Creemos que el cuidado va más allá de un tratamiento. Nuestro blog está diseñado para compartir contigo los mejores consejos, tendencias y secretos del mundo de la estetica facial y corporal."
              imgUrl={Img.img4}
            />

            <T_Nosotros_H
              Title="Ofertas y Promociones Exclusivas!"
              description="Te consentimos con nuestras ofertas y promociones especiales diseñadas para realzar tu belleza sin vaciar tu bolsillo. ¡Descubre las increíbles oportunidades que tenemos para ti!"
              imgUrl={Img.img5}
            />
        </div>
        <div className='servicioDestacados'>
            <h3 className='titleHomeServicios' style={{ fontFamily: "Comorant", fontWeight: 800, fontStyle: "italic", textAlign: "center" }}>
              Servicios Destacados
            </h3>
        <div className='ContainerServicioDestacados'>
        
            <T_Servicio_H
              Title="Limpieza faciales profundas"
              description="Eliminamos impurezas, revitalizamos tu piel y te dejamos con un rostro radiante y saludable. Cada limpieza se adaptan a las necesidades específicas de tu piel, utilizando productos y técnicas personalizadas para garantizar los mejores resultados."
              imgUrl={Img.img6}
            />

            <T_Servicio_H
              Title="Extensiones de Pestañas"
              description="Transformar tu mirada nunca fue tan fácil. Con nuestras extensiones de pestañas, tendrás un look espectacular y natural, diseñado especialmente para realzar la belleza de tus ojos."
              imgUrl={Img.img7}
            />

            <T_Servicio_H
              Title="Micropigmentación de Cejas y Labios"
              description="Descubre el secreto para unas cejas perfectamente definidas y unos labios siempre radiantes. Nuestra técnica avanzada de micropigmentación te proporciona un look impecable y duradero, realzando tu belleza natural de manera sutil y sofisticada."
              imgUrl={Img.img8}
            />

        </div>
            <p style={{ fontFamily: "Comorant" }} className='textDescripcionInicialHomeServicio'>
              Pero esto no es todo! En Salón Xanadu , tenemos una amplia gama de servicios diseñados para satisfacer todas tus necesidades de belleza y bienestar.
            </p>
          <div className='containerButtonInicialHomeServicio'>
            <Link className='buttonIncialHomeServicio' to='/services' style={{ fontFamily: "Comorant", fontStyle: "italic" }}>
              Todos los Servicios
            </Link>
          </div>
          </div>
          <div className='containerHomeProduct'>
            <div className='containerHomeProductImg'>
              <img 
                src={ImgProduct} 
                className='imgHomeProduct' 
                alt="Productos de belleza Salón Xanadu"
                width="600"
                height="400"
                loading="lazy"
              />
            </div>
            <div className='containerHomeProductText'>
                <h3 className='titleHomeProduct' style={{ fontFamily: "Comorant", fontWeight: 800, fontStyle: "italic" }}>
                  Productos
              </h3>
              <p className='descriptionHomeProduct' style={{ fontFamily: "Comorant" }}>
                Sumérgete en un mundo de sensaciones con nuestros productos de belleza. Cada producto ha sido cuidadosamente seleccionado para brindarte resultados visibles y una experiencia única. ¡Explora nuestra tienda y encuentra tus nuevos favoritos!
              </p>
            <div className='containerButtonInicialHomeServicio'>
              <Link className='buttonIncialHomeServicio' to='/products' style={{ fontFamily: "Comorant", fontStyle: "italic" }}>
                Conocer Productos
              </Link>
            </div>
            </div>
          </div>

          <div className='containerHomeTestimonio'>
              <h3 className='titleHometestimonio' style={{ fontFamily: "Comorant", fontWeight: 800, fontStyle: "italic",textAlign:"center" }}>
                Testimonios
              </h3>

              <Test_Carusel />
          </div>
        </div>
      
    
    </PageWrapper>
    </>
  );
}

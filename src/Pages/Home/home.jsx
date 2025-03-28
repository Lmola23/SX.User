import './home.css';
import { Link } from "react-router-dom";
import './../../Style/fonts.css';
import { T_Nosotros_H, T_Servicio_H } from './../../Components/Targetas/index.js';
import Img from './../../Utiles/imgHome.js';
import ImgProduct from './../../assets/HomeImg/imgProductoHome.jpeg';
import Test_Carusel from './../../Components/Test_Carusel/Test_Carusel.jsx';
import { FadeInSection } from "../../Components/Utils/index.js";
import { useAuth } from './../../Components/Utils/AuthProvider/AuthProvider.jsx'; // Importa el AuthContext

export default function Home() {
  const { isAuthenticated } = useAuth(); // Usamos el estado de autenticación del AuthProvider

  return (
    <div className='containerHome' style={{ fontFamily: "Comorant" }}>
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

      <div className='containerEscogenos'>
        <FadeInSection delay={0.6}>
          <h3 className='titleHomeEscogernos' style={{ fontFamily: "Comorant", fontWeight: 800, fontStyle: "italic" }}>
            ¿Por qué escogernos?
          </h3>
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <T_Nosotros_H
            Title="En Salón Xanadu"
            description="Ofrecemos un cuidado integral y personalizado. Aquí encontrarás tratamientos corporales y faciales de última generación, un entorno acogedor y un equipamiento moderno."
            imgUrl={Img.img1}
          />
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <T_Nosotros_H
            Title="Atención Personalizada"
            description="Cada cliente es único. Nuestro equipo de expertos te brindará una atención personalizada, adaptando cada tratamiento a tus necesidades específicas."
            imgUrl={Img.img2}
          />
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <T_Nosotros_H
            Title="Productos exclusivos"
            description="No solo te ofrecemos tratamientos de primera calidad, sino también una selección de productos exclusivos para que puedas llevar el cuidado personal y la belleza a casa. Nuestros productos están diseñados para complementar tus tratamientos y ayudarte a mantener los resultados espectaculares."
            imgUrl={Img.img3}
          />
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <T_Nosotros_H
            Title="Explora Nuestro Blog de Cuidado de la piel y Bienestar personal!"
            description="Creemos que el cuidado va más allá de un tratamiento. Nuestro blog está diseñado para compartir contigo los mejores consejos, tendencias y secretos del mundo de la estetica facial y corporal."
            imgUrl={Img.img4}
          />
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <T_Nosotros_H
            Title="Ofertas y Promociones Exclusivas!"
            description="Te consentimos con nuestras ofertas y promociones especiales diseñadas para realzar tu belleza sin vaciar tu bolsillo. ¡Descubre las increíbles oportunidades que tenemos para ti!"
            imgUrl={Img.img5}
          />
        </FadeInSection>
      </div>

      <div className='ContainerServicioDestacados'>
        <FadeInSection>
          <h3 className='titleHomeServicios' style={{ fontFamily: "Comorant", fontWeight: 800, fontStyle: "italic", textAlign: "center" }}>
            Servicios Destacados
          </h3>
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <T_Servicio_H
            Title="Limpieza faciales profundas"
            description="Eliminamos impurezas, revitalizamos tu piel y te dejamos con un rostro radiante y saludable. Cada limpieza se adaptan a las necesidades específicas de tu piel, utilizando productos y técnicas personalizadas para garantizar los mejores resultados."
            imgUrl={Img.img6}
          />
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <T_Servicio_H
            Title="Extensiones de Pestañas"
            description="Transformar tu mirada nunca fue tan fácil. Con nuestras extensiones de pestañas, tendrás un look espectacular y natural, diseñado especialmente para realzar la belleza de tus ojos."
            imgUrl={Img.img7}
          />
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <T_Servicio_H
            Title="Micropigmentación de Cejas y Labios"
            description="Descubre el secreto para unas cejas perfectamente definidas y unos labios siempre radiantes. Nuestra técnica avanzada de micropigmentación te proporciona un look impecable y duradero, realzando tu belleza natural de manera sutil y sofisticada."
            imgUrl={Img.img8}
          />
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <T_Servicio_H
            Title="Blanqueamiento Dental Profesional"
            description="Sueñas con una sonrisa más blanca y brillante? te ofrecemos un tratamiento de blanqueamiento dental seguro y efectivo, diseñado para devolverte la confianza y hacerte sonreír con orgullo."
            imgUrl={Img.img9}
          />
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <p style={{ fontFamily: "Comorant" }} className='textDescripcionInicialHomeServicio'>
            Pero esto no es todo! En Salón Xanadu , tenemos una amplia gama de servicios diseñados para satisfacer todas tus necesidades de belleza y bienestar.
          </p>
        </FadeInSection>

        <div className='containerButtonInicialHomeServicio'>
          <Link className='buttonIncialHomeServicio' to='/Servicios' style={{ fontFamily: "Comorant", fontStyle: "italic" }}>
            Todos los Servicios ...
          </Link>
        </div>

        <div className='containerHomeProduct'>
          <div className='containerHomeProductImg'>
            <img src={ImgProduct} className='imgHomeProduct' />
          </div>

          <FadeInSection>
            <h3 className='titleHomeProduct' style={{ fontFamily: "Comorant", fontWeight: 800, fontStyle: "italic" }}>
              Productos
            </h3>
            <p className='descriptionHomeProduct' style={{ fontFamily: "Comorant" }}>
              Sumérgete en un mundo de sensaciones con nuestros productos de belleza. Cada producto ha sido cuidadosamente seleccionado para brindarte resultados visibles y una experiencia única. ¡Explora nuestra tienda y encuentra tus nuevos favoritos!
            </p>
          </FadeInSection>

          <div className='containerButtonInicialHomeServicio'>
            <Link className='buttonIncialHomeServicio' to='/Servicios' style={{ fontFamily: "Comorant", fontStyle: "italic" }}>
              Conocer Productos
            </Link>
          </div>
        </div>

        <div className='containerHomeTestimonio'>
          <FadeInSection delay={0.6}>
            <h3 className='titleHometestimonio' style={{ fontFamily: "Comorant", fontWeight: 800, fontStyle: "italic",textAlign:"center" }}>
              Testimonios
            </h3>
          </FadeInSection>

          <FadeInSection delay={0.6}>
            <Test_Carusel />
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}

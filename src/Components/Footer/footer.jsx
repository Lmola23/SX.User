import { FaPhone, FaFacebook, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaTwitter } from 'react-icons/fa';
import './footer.css'; // Importa tu archivo CSS para estilos
import './../../Style/fonts.css';
function Footer() {
  const contacts = [
    { icon: <FaPhone />, label: "Teléfono", value: "[Número de teléfono]" },
    { icon: <FaEnvelope />, label: "Correo Electrónico", value: "contacto@nombre.com" },
    { icon: <FaMapMarkerAlt />, label: "Dirección", value: "[Dirección]" },
  ];

  const socialMedia = [
    { icon: <FaFacebook />, label: "Facebook", value: "[Nombre del Salón]", link: "[Enlace a Facebook]" },
    { icon: <FaInstagram />, label: "Instagram", value: "[@nombredelsalon]", link: "[Enlace a Instagram]" },
    { icon: <FaTwitter />, label: "Twitter", value: "[@nombredels]", link: "[Enlace a Twitter]" },
  ];
  return (
    <footer className="footer">
      <div className="containerfotter">

        <div className="containerFotterContacto" style={{ fontFamily: "Comorant" }}>
          <h3 style={{ textAlign: "center" }} className='titleContFooter'>Contactos</h3>
          <ul style={{ listStyle: "none" }} className="contact-list">
            {contacts.map((contact, index) => (
              <li key={index} className="contact-item">
                {contact.icon}
                <span style={{ fontWeight: 800 }} className="contact-label">{contact.label}:</span>
                <span className="contact-value">{contact.value}</span> {/* No es un enlace */}
              </li>
            ))}
          </ul>
        </div>

        <div className="containerFotterSeguir" style={{ fontFamily: "Comorant" }}>
          <h3 className='titleSegFooter' style={{ textAlign: 'center' }}>Síguenos</h3>
          <ul style={{ listStyle: "none" }} className="social-media-list">
            {socialMedia.map((item, index) => (
              <li key={index} className="socialMediaItem">
                {item.icon}
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="social-media-link">
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footerDerechoAutor" style={{ fontFamily: "Comorant", fontStyle: 'italic' }}>
        <p>© En Salón Xanadu 2025. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;

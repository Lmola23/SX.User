import { FaPhone, FaFacebook, FaInstagram, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import './footer.css';
import './../../Style/fonts.css';

function Footer() {
  const contacts = [
    { icon: <FaPhone className="footer-icon" />, value: "55890908" },
    { icon: <FaEnvelope className="footer-icon" />, value: "Keniaconsepcion77@gmail.com" },
    { icon: <FaMapMarkerAlt className="footer-icon" />, value: "Ángel Amejeira #29 e/ Juan Gualberto Gómez y Camilo Cienfuegos. Puerto Padre, Las Tunas." },
  ];

  const socialMedia = [
    { 
      icon: <FaFacebook className="social-icon" />, 
      value: "Kenia Consepcion", 
      link: "https://www.facebook.com/share/1AXXj94qRM/?mibextid=wwXIfr" 
    },
    { 
      icon: <FaInstagram className="social-icon" />, 
      value: "salon_xanadu", 
      link: "#" 
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Contactos</h3>
          <ul className="footer-list">
            {contacts.map((contact, index) => (
              <li key={index} className="footer-item">
                <span className="icon-wrapper">{contact.icon}</span>
                <span className="footer-text">{contact.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Síguenos</h3>
          <ul className="footer-list">
            {socialMedia.map((item, index) => (
              <li key={index} className="footer-item">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                >
                  <span className="icon-wrapper">{item.icon}</span>
                  <span className="footer-text">{item.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© Salón Xanadu 2025. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
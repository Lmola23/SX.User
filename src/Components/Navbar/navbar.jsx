import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'react-feather';
import logo from './../../assets/logo.png';
import LogoutModal from './../LogoutModal/LogoutModal.jsx';
import { useAuth } from './../Utils/AuthProvider/AuthProvider.jsx'; // Importa solo useAuth
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Usa el hook useAuth para obtener isAuthenticated y logout
  const { isAuthenticated, logout } = useAuth();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate('/');
  };

  const handleRegisterClick = () => {
    navigate('/register', { state: { from: location.pathname } });
    closeMenu();
  };

  const handleLoginClick = () => {
    navigate('/login', { state: { from: location.pathname } });
    closeMenu();
  };

  return (
    <>
      <nav className="navbar">
        <img src={logo} className="logo" alt="Logo" />
        <h1 className="title" style={{ fontFamily: "Cormorant", fontStyle: "italic", fontWeight: 800 }}>
          SALÓN XANADU
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="menu-icon">
          {isOpen ? "" : <Menu size={30} color="black" />}
        </button>
      </nav>
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
      <div className={`nav-menu ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
        <button onClick={closeMenu} className="close-icon">
          <X size={30} color="black" />
        </button>
        <div className="container_item" style={{ fontFamily: "Comorant", fontStyle: "italic" }}>
          <Link className={`item ${location.pathname === "/" ? "active" : ""}`} to="/" onClick={closeMenu}>Inicio</Link>
          <Link className={`item ${location.pathname === "/services" ? "active" : ""}`} to="/services" onClick={closeMenu}>Servicios</Link>
          <Link className={`item ${location.pathname === "/products" ? "active" : ""}`} to="/products" onClick={closeMenu}>Productos</Link>
          <Link className={`item ${location.pathname === "/booking" ? "active" : ""}`} to="/booking" onClick={closeMenu}>Reservaciones</Link>
          <Link className={`item ${location.pathname === "/blog" ? "active" : ""}`} to="/blog" onClick={closeMenu}>Kenia Blog</Link>
          {isAuthenticated ? (
            <>
              <Link className={`item ${location.pathname === "/profile" ? "active" : ""}`} to="/profile" onClick={closeMenu}>Perfil</Link>
              <button className="item logout-button" onClick={() => setIsLogoutModalOpen(true)}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <button className={`item ${location.pathname === "/login" ? "active" : ""}`} onClick={handleLoginClick}>Iniciar sesión</button>
              <button className={`item ${location.pathname === "/register" ? "active" : ""}`} onClick={handleRegisterClick}>Crear Cuenta</button>
            </>
          )}
        </div>
      </div>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;


import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'react-feather';
import logo from './../../assets/logo.png';
import LogoutModal from './../LogoutModal/LogoutModal.jsx';
import { useAuth } from './../Utils/AuthProvider/AuthProvider.jsx';
import './navbar.css';
import './../../Style/fonts.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const menuRef = useRef(null);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate('/');
    closeMenu();
  };

  const handleRegisterClick = () => {
    navigate('/register', { state: { from: location.pathname } });
    closeMenu();
  };

  const handleLoginClick = () => {
    navigate('/login', { state: { from: location.pathname } });
    closeMenu();
  };

  // Cierra el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <img src={logo} className="logo" alt="Logo" />
          <h1 className="title">SALÓN XANADU</h1>
        </div>
        <button onClick={() => setIsOpen(prev => !prev)} className="menu-icon">
          {isOpen ? <X size={30} color="black" /> : <Menu size={30} color="black" />}
        </button>
        <div ref={menuRef} className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link className={`item ${location.pathname === "/" ? "active" : ""}`} to="/" onClick={closeMenu}>
            Inicio
          </Link>
          <Link className={`item ${location.pathname === "/services" ? "active" : ""}`} to="/services" onClick={closeMenu}>
            Servicios
          </Link>
          <Link className={`item ${location.pathname === "/products" ? "active" : ""}`} to="/products" onClick={closeMenu}>
            Productos
          </Link>
          <Link className={`item ${location.pathname === "/booking" ? "active" : ""}`} to="/booking" onClick={closeMenu}>
            Reservaciones
          </Link>
          {isAuthenticated ? (
            <>
              <Link className={`item ${location.pathname === "/perfil" ? "active" : ""}`} to="/perfil" onClick={closeMenu}>
                Perfil
              </Link>
              <button className="item logout-button" onClick={() => setIsLogoutModalOpen(true)}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <button className={`item ${location.pathname === "/login" ? "active" : ""}`} onClick={handleLoginClick}>
                Iniciar sesión
              </button>
              <button className={`item ${location.pathname === "/register" ? "active" : ""}`} onClick={handleRegisterClick}>
                Crear Cuenta
              </button>
            </>
          )}
        </div>
      </nav>
      {isOpen && <div className="overlay-navar" onClick={closeMenu}></div>}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;
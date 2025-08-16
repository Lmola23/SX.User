import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'react-feather';
import logo from './../../assets/logo.png';
import './navbar.css';
import './../../Style/fonts.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const closeMenu = () => setIsOpen(false);

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
      <nav className="navbar" style={{fontFamily: 'Cormorant, sans-serif'}}>
        <div className="brand">
          <img src={logo} className="logo" alt="Logo" />
          <h1 className="title">SALÓN XANADU</h1>
        </div>
        <button onClick={() => setIsOpen(prev => !prev)} className="menu-icon">
          {isOpen ? <X size={30} color="black" /> : <Menu size={30} color="black" />}
        </button>
        <div ref={menuRef} className={`nav-links ${isOpen ? "open" : ""}`}>
          {/* Encabezado para menú móvil */}
          
          <Link className={`item ${location.pathname === "/" ? "active" : ""}`} to="/" onClick={closeMenu}>
            Inicio
          </Link>
          <Link className={`item ${location.pathname === "/services" ? "active" : ""}`} to="/services" onClick={closeMenu}>
            Servicios
          </Link>
          <Link className={`item ${location.pathname === "/products" ? "active" : ""}`} to="/products" onClick={closeMenu}>
            Productos
          </Link>
         
           <Link className={`item ${location.pathname === "/gallery" ? "active" : ""}`} to="/gallery" onClick={closeMenu}>
            Galeria
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
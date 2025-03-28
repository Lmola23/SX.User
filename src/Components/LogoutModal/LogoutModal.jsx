import React from 'react';
import './LogoutModal.css';
import './../../Style/fonts.css';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlayCerrarSesion" style={{ fontFamily: "Comorant",fontStyle:"italic" }}>
      <div className="modal-contentCerrarSesion">
        <h2 style={{marginBottom:"1vh"}}>Confirmar Cierre de Sesión</h2>
        <p style={{marginBottom:"2vh"}}>¿Estás seguro de que deseas cerrar sesión?</p>
        <div className="modal-buttonsCerrarSesion">
          <button onClick={onConfirm} className="btnConfirm" style={{fontFamily:"Comorant"}}>Sí, cerrar sesión</button>
          <button onClick={onClose} className="btnCancel" style={{fontFamily:"Comorant"}}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
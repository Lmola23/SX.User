import React from 'react';
import './LogoutModal.css';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlayCerrarSesion">
      <div className="modal-contentCerrarSesion">
        <h2>Confirmar Cierre de Sesión</h2>
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
        <div className="modal-buttonsCerrarSesion">
          <button onClick={onConfirm} className="btnConfirm">Sí, cerrar sesión</button>
          <button onClick={onClose} className="btnCancel">Cancelar</button>
        </div>
      </div>
    </div>
  );
}
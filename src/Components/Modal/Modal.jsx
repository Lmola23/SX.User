import React from "react";
import "./Modal.css";
import "./../../Style/fonts.css";

const Modal = ({ isOpen, onClose, title, Body }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-comp" style={{ fontFamily: "Comorant" }}>
      <div className="modal-content-comp">
        {title && <h3 className="modal-title-comp">{title}</h3>}
        <div className="modal-body-comp">
         <p>{Body}</p>
        </div>
        <button onClick={onClose} className="modal-button-comp">
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default Modal;
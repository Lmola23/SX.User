import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ImageFullScreenViewer.css";

export default function ImageFullScreenViewer({ imageUrl, alt = "Imagen" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Animaciones
  const variants = {
    initial: { scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" },
    open: { scale: 1.1, boxShadow: "0 0 0 100vmax rgba(0,0,0,0.8)" },
    exit: { scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }
  };

  return (
    <>
      <motion.div
        className="image-container"
        whileHover={{ scale: 1.03 }}
        onClick={() => setIsOpen(true)}
        style={{ cursor: "pointer", display: "inline-block" ,margin:"10%"}}
      >
        <img src={imageUrl} alt={alt} className="image-thumb" />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.img
              src={imageUrl}
              alt={alt}
              style={{
                maxWidth: "100vw",
                maxHeight: "100vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                display: "block",
                margin: "auto"
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={e => e.stopPropagation()}
            />
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
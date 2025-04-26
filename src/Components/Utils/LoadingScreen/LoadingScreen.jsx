import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./../../../assets/logo.png";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  const [showScreen, setShowScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScreen(false);
    }, 5000); // 3 segundos de duración mínima

    return () => clearTimeout(timer);
  }, []);

  if (!showScreen) return null;

  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="loading-content"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="loading-logo-container"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img src={Logo} alt="Logo" className="loading-logo" />
        </motion.div>
        <motion.div 
          className="loading-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="dot">.</span>
          <span className="dot" style={{ animationDelay: "0.2s" }}>.</span>
          <span className="dot" style={{ animationDelay: "0.4s" }}>.</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
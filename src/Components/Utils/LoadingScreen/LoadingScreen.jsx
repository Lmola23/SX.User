import { motion } from "framer-motion";
import Logo from "../../../assets/Logo.png";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="loading-content"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
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
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
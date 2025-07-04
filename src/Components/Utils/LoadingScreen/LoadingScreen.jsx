import { useEffect } from 'react';
import './LoadingScreen.css';
import imgLogo from '../../../assets/logo.png'; // Asegúrate de que la ruta sea correcta

const LoadingScreen = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo-container">
          <img src={imgLogo} alt="Salón Xanadu" className="loading-logo" />
        </div>
        <div className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 
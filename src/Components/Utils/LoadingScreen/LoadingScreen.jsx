import { useEffect, useState } from "react";
import Logo from "./../../../assets/logo.png";
import "./LoadingScreen.css";

const LoadingScreen = ({ onLoadingComplete }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkResources = async () => {
            try {
                // Espera a que se cargue completamente el documento (HTML, estilos, imágenes, etc.)
                await new Promise(resolve => {
                    if (document.readyState === 'complete') {
                        resolve();
                    } else {
                        window.addEventListener('load', resolve);
                    }
                });

                setIsLoading(false);
                if (onLoadingComplete) onLoadingComplete();
            } catch (error) {
                console.error("Error durante la carga:", error);
                setIsLoading(false);
            }
        };

        checkResources();
    }, [onLoadingComplete]);

    // Mientras isLoading es true, muestra solo la pantalla de carga
    if (!isLoading) return null;

    return (
        <div 
            className="loading-screen"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div className="loading-content">
                <div className="loading-logo-container">
                    <img src={Logo} alt="Logo" className="loading-logo" />
                </div>
                <div className="loading-dots">
                    <span className="dot">.</span>
                    <span className="dot" style={{ animationDelay: "0.2s" }}>.</span>
                    <span className="dot" style={{ animationDelay: "0.4s" }}>.</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
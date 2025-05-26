import { useEffect, useState } from "react";
import Logo from "./../../../assets/logo.png";
import "./LoadingScreen.css";

const LoadingScreen = ({ onLoadingComplete }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const waitForLoad = async () => {
            try {
                // Espera a que se cargue el DOM, recursos (CSS, imágenes) y fuentes
                const fontsReady = document.fonts?.ready || Promise.resolve();
                const windowLoad = new Promise(resolve => {
                    if (document.readyState === 'complete') {
                        resolve();
                    } else {
                        window.addEventListener('load', resolve, { once: true });
                    }
                });

                // Esperar a que todo esté listo
                await Promise.all([fontsReady, windowLoad]);

                setIsLoading(false);
                if (onLoadingComplete) onLoadingComplete();
            } catch (error) {
                console.error("Error durante la carga completa de recursos:", error);
                setIsLoading(false); // En caso de error, eliminar la pantalla de carga
            }
        };

        waitForLoad();
    }, [onLoadingComplete]);

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

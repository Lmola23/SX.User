import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./../../../assets/logo.png";
import "./LoadingScreen.css";

const LoadingScreen = ({ onLoadingComplete }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkResources = async () => {
            const startTime = Date.now();
            try {
                // Espera a que la página (imágenes, estilos y demás) se carguen
                await Promise.all([
                    new Promise(resolve => {
                        if (document.readyState === 'complete') {
                            resolve();
                        } else {
                            window.addEventListener('load', resolve);
                        }
                    }),
                    new Promise(resolve => {
                        requestAnimationFrame(() => {
                            requestAnimationFrame(resolve);
                        });
                    })
                ]);

                // Asegura un tiempo mínimo de 5000ms en pantalla de carga
                const elapsed = Date.now() - startTime;
                const minDelay = 5000;
                if (elapsed < minDelay) {
                    await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
                }

                setIsLoading(false);
                if (onLoadingComplete) onLoadingComplete();
            } catch (error) {
                console.error("Error durante la carga:", error);
                setIsLoading(false);
            }
        };

        checkResources();
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div 
                    className="loading-screen"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
                        backgroundColor: "#fff" // fondo blanco para ocultar cualquier otro contenido
                    }}
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
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
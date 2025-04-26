import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import './PageWraper.css';

const PageWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const checkDataLoaded = () => {
      // Busca elementos con data-loading attribute
      const loadingElements = document.querySelectorAll('[data-loading="true"]');
      return loadingElements.length === 0;
    };

    const preloadContent = async () => {
      try {
        // Espera a que las imágenes se carguen
        const images = document.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        });

        // Espera a que los datos del servidor estén listos
        const waitForData = new Promise(resolve => {
          const checkInterval = setInterval(() => {
            if (checkDataLoaded()) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
        });

        // Espera que se cumplan todas las promesas
        await Promise.all([
          Promise.all(imagePromises),
          waitForData,
          new Promise(resolve => setTimeout(resolve, 800)) // Tiempo mínimo de carga
        ]);

        setContentReady(true);
        setTimeout(() => setIsLoading(false), 100);
      } catch (error) {
        console.error('Error loading content:', error);
        setIsLoading(false);
      }
    };

    preloadContent();

    return () => setIsLoading(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div 
          className="page-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {contentReady && children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageWrapper;
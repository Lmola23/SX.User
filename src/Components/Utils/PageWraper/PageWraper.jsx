import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import './PageWraper.css';

const PageWrapper = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  const handleLoadingComplete = () => {
    setIsReady(true);
  };

  return (
    <>
      {!isReady && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <AnimatePresence mode="wait">
        {isReady && (
          <motion.div 
            className="page-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageWrapper;
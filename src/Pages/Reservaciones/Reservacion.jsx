import { motion } from "framer-motion";
import PageWrapper from "../../Components/Utils/PageWraper/PageWraper.jsx";

import ReservacionMenu from './../../Components/MenuReservacion/MenuReservacion.jsx';
import './Reservacion.css';
export default function Reservacion() {
  return (
    <PageWrapper>
    <motion.div 
      className="containerReservacionSection"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='containerReservacionSection'>
        <ReservacionMenu />

      </div>
      </motion.div>
      </PageWrapper>

  );
}

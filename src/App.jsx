import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar.jsx";
import Footer from './Components/Footer/footer.jsx';
import {Home, Producto, Galeria, Servicio} from "./Pages/index.js";

function App() {
  return (
    <div className="AppContainer">
        <Router basename={process.env.PUBLIC_URL || '/'}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Servicio />} />
            <Route path="/products" element={<Producto />} />
            <Route path="/gallery" element={<Galeria />} />
          </Routes>
          <Footer />
        </Router>
    </div>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar.jsx";
import {Home,Servicio,Producto,Reservacion} from "./Pages/index.js";
import { Login, Register } from './Components/Account/index.js';
import { AuthProvider } from './Components/Utils/AuthProvider/AuthProvider.jsx';
import {ProtectedRoute,ScrollToTop} from './Components/Utils/index.js';
import Footer from './Components/Footer/footer.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Servicio />} />
          <Route path="/products" element={<Producto />} />
          <Route path="/booking" element={
            <ProtectedRoute>
              <Reservacion />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
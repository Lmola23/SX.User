import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from 'react';
import Navbar from "./Components/Navbar/navbar.jsx";
import { Home, Servicio, Producto, Reservacion, Perfil } from "./Pages/index.js";
import { Login, Register } from './Components/Account/index.js';
import { AuthProvider } from './Components/Utils/AuthProvider/AuthProvider.jsx';
import { ProtectedRoute, ScrollToTop } from './Components/Utils/index.js';
import Footer from './Components/Footer/footer.jsx';
import { requestNotificationPermission, onMessageListener } from "./firebaseconf.js";
import { useEffect } from "react";
import LoadingScreen from './Components/Utils/LoadingScreen/LoadingScreen';

function App() {
  useEffect(() => {
    // Solicitar permisos de notificación al iniciar la app
    requestNotificationPermission();

    // Escuchar notificaciones en primer plano
    onMessageListener()
      .then((payload) => {
        console.log("Notificación recibida en primer plano:", payload);
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: "/icon.png"
        });
      })
      .catch((err) => console.log("Error en la notificación:", err));
  }, []);

  return (
    <div className="AppContainer">
      <AuthProvider>
        <Router basename={process.env.PUBLIC_URL || '/'}>
          <Suspense fallback={<LoadingScreen />}>
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
              <Route path="/perfil" element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              } />
            </Routes>
            <Footer />
          </Suspense>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
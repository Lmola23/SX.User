import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Navbar from "./Components/Navbar/navbar.jsx";
import { AuthProvider } from './Components/Utils/AuthProvider/AuthProvider.jsx';
import { ProtectedRoute, ScrollToTop } from './Components/Utils/index.js';
import Footer from './Components/Footer/footer.jsx';
import { requestNotificationPermission, onMessageListener } from "./firebaseconf.js";
import { useEffect } from "react";
import LoadingScreen from './Components/Utils/LoadingScreen/LoadingScreen';

// Importa los componentes de forma lazy
const Home = lazy(() => import('./Pages/Home/home.jsx'));
const Servicio = lazy(() => import('./Pages/Servicios/Servicio.jsx'));
const Producto = lazy(() => import('./Pages/Productos/Producto.jsx'));
const Reservacion = lazy(() => import('./Pages/Reservaciones/Reservacion.jsx'));
const Perfil = lazy(() => import('./Pages/Perfil/Perfil.jsx'));
const Login = lazy(() => import('./Components/Account/Login/Login.jsx'));
const Register = lazy(() => import('./Components/Account/Register/Register.jsx'));
const Galeria = lazy(() => import('./Pages/Galeria/Galeria.jsx'));

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
              <Route path="/gallery" element={<Galeria />} />
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
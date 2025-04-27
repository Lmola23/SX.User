import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./Components/Utils/AuthProvider/AuthProvider.jsx";

// Conversión de la clave VAPID de Base64 a Uint8Array
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

// Función para suscribir al usuario al Push Manager
const subscribeUser = async (registration) => {
  // Reemplaza esta clave pública con la generada para tu aplicación VAPID
  const vapidPublicKey = 'TU_APPLICATION_SERVER_PUBLIC_KEY';
  const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });
    console.log("Usuario suscrito:", subscription);
    // Aquí puedes enviar 'subscription' a tu servidor para guardar la suscripción
    return subscription;
  } catch (error) {
    console.error("Error al suscribir al usuario:", error);
  }
};

// Registro del Service Worker y suscripción a push
const registerServiceWorkerAndSubscribe = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registrado con éxito:", registration);
      await subscribeUser(registration);
    } catch (error) {
      console.error("Error registrando el Service Worker o al suscribir:", error);
    }
  } else {
    console.warn("Push messaging o Service Workers no están soportados en este navegador.");
  }
};

registerServiceWorkerAndSubscribe();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
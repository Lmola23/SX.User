import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyApGZ3x8yiz8kisetli-4-JLmACcfzOHt0",
  authDomain: "sxapp-ec39e.firebaseapp.com",
  projectId: "sxapp-ec39e",
  storageBucket: "sxapp-ec39e.firebasestorage.app",
  messagingSenderId: "412286253399",
  appId: "1:412286253399:web:c30a7f074c8b54254d6612",
  measurementId: "G-2J22LTGTDR"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ✅ Función para solicitar permisos de notificación
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Permiso concedido");
      const token = await getToken(messaging, {
        vapidKey: "BFRAAcvhN9lZER_ei5o9Mb72-V7YVEltp5UWbWmAcn6oALzzLBMKcX64VsXEX931sVRZsrML9QPwxM8kU29UmXs"
      });
      console.log("Token de notificación:", token);
      return token;
    } else {
      console.warn("Permiso de notificación denegado");
    }
  } catch (error) {
    console.error("Error al obtener el token:", error);
  }
};

// ✅ Función para escuchar mensajes en primer plano
export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export { messaging };

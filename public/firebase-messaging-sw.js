// public/firebase-messaging-sw.js
// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyApGZ3x8yiz8kisetli-4-JLmACcfzOHt0",
  authDomain: "sxapp-ec39e.firebaseapp.com",
  projectId: "sxapp-ec39e",
  storageBucket: "sxapp-ec39e.firebasestorage.app",
  messagingSenderId: "412286253399",
  appId: "1:412286253399:web:c30a7f074c8b54254d6612",
  measurementId: "G-2J22LTGTDR"
});

const messaging = firebase.messaging();

// Manejar mensajes en segundo plano
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Mensaje recibido en segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/logo192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

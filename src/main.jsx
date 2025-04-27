import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./Components/Utils/AuthProvider/AuthProvider.jsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then((registration) => {
      console.log("Service Worker registrado con éxito:", registration);
    })
    .catch((error) => {
      console.error("Error registrando el Service Worker:", error);
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

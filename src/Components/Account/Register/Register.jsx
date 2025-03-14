import { useState } from 'react';
import { requestNotificationPermission } from '../../../firebaseconf.js'; 
import './Register.css';

export default function Registro() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deviceToken, setDeviceToken] = useState('');

  // Solicitar permiso de notificación cuando el usuario haga clic
  const handleRequestPermission = async () => {
    try {
      const token = await requestNotificationPermission();
      if (token) {
        setDeviceToken(token);
        console.log('Token de dispositivo obtenido:', token);
      }
    } catch (error) {
      console.error('Error al obtener permisos de notificación:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5249/api/Cliente/Account/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreUsuario,
          contraseña,
          numeroTelefono,
          deviceToken, // Enviar el token de dispositivo al backend
        }),
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      const data = await response.json();
      console.log('Registro exitoso:', data);
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={{padding:"200px"}}>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={numeroTelefono}
          onChange={(e) => setNumeroTelefono(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
      <button onClick={handleRequestPermission}>Habilitar Notificaciones</button>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Register.css';

export default function Registro() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:5249/api/Cliente/Account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreUsuario: nombreUsuario,
          contraseña: contraseña,
          numeroTelefono: numeroTelefono
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Uno o más parámetros no cumplen con los requisitos.');
        } else {
          throw new Error(`Error en el servicio: ${response.status}`);
        }
      }

      const textData = await response.text();
      if (!textData) {
        throw new Error('La respuesta del API está vacía');
      }

      const data = JSON.parse(textData);
      console.log('Registro exitoso:', data);

      // Suponiendo que la respuesta contiene un token de autenticación
      const token = data.token;
      localStorage.setItem('token', token);

      // Redirigir al usuario a la ruta de redirección
      navigate(redirectPath);
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="registro-container">
      <h2>Registro</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="nombreUsuario">Nombre de Usuario</label>
          <input
            type="text"
            id="nombreUsuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numeroTelefono">Teléfono</label>
          <input
            type="tel"
            id="numeroTelefono"
            value={numeroTelefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="buttonRegister">Registrarse</button>
      </form>
    </div>
  );
}
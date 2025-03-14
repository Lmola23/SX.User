import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Utils/AuthProvider/AuthProvider.jsx';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://013d-149-22-84-164.ngrok-free.app/api/Cliente/Account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreUsuario: username, contraseña: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error en el login');
        return;
      }

      const data = await response.json();
      console.log('Login exitoso:', data);

      // Suponiendo que la respuesta contiene un token de autenticación
      const id = data.id;
      localStorage.setItem('usuarioId', id);

      login(); // Actualiza el estado de autenticación
      navigate(redirectPath); // Redirige a la ruta de redirección
    } catch (error) {
      console.error('Error en el login:', error);
      setErrorMessage('Error en el login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className='buttonLogin' type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/register" state={{ from: location.state?.from }}>Regístrate aquí</Link>
      </p>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Evitar recarga de página
    console.log("Formulario enviado"); // Mensaje para confirmar ejecución
  };
  
  
    setStatusMessage("Espere, iniciando sesión...");
  
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setStatusMessage("Inicio de sesión exitoso");
        navigate("/filters");
      } else {
        setStatusMessage(`Error: ${data.detail || "Credenciales incorrectas"}`);
      }
    } catch (error) {
      setStatusMessage("Error al conectar con el servidor.");
    }
  };
  

  return (
    <div className="container">
      <h1>Inicio de Sesión</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
};

export default Login;

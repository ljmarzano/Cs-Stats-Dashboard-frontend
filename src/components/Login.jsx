import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    console.log("Formulario enviado"); // Confirmación en consola

    setStatusMessage("Espere, iniciando sesión...");

    try {
                const backendUrl = process.env.REACT_APP_BACKEND_URL;
                if (!backendUrl) {
                  setStatusMessage("Error: Backend URL no está configurado.");
                  return;
                }
                const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("Inicio de sesión exitoso");
        navigate("/filters"); // Redirige a la página de filtros
      } else {
        setStatusMessage(`Error: ${data.detail || "Credenciales incorrectas"}`);
      }
    } catch (error) {
      setStatusMessage("Error al conectar con el servidor.");
      console.error("Error al enviar la solicitud:", error);
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
        <button type="submit">Iniciar Sesión</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default Login;
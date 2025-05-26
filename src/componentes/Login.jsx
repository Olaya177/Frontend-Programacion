import { useState } from "react";
import axios from "axios";

function Login({ setUsuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("https://backend-programacion.onrender.com/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUsuario(res.data.usuario);
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="container mt-5 bg-dark text-white p-4 rounded">
      <h2 className="text-morado">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="form-control mb-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-morado" type="submit">Entrar</button>
      </form>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
}

export default Login;
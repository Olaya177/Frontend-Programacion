import { useState } from "react";
import axios from "axios";

function Registro() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [mensaje, setMensaje] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje("");
    try {
      await axios.post("http://localhost:3000/auth/register", form);
      setMensaje("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
      setForm({ nombre: "", email: "", password: "" });
    } catch (err) {
      setMensaje("Error al registrar usuario.");
    }
  };

  return (
    <div className="container mt-5 bg-dark text-white p-4 rounded">
      <h2 className="text-morado">Registro</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input className="form-control mb-2" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="form-control mb-2" name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        <button className="btn btn-morado" type="submit">Registrarse</button>
      </form>
      {mensaje && <div className="alert alert-info mt-2">{mensaje}</div>}
    </div>
  );
}

export default Registro;
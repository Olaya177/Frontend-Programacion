import { useEffect, useState } from "react";
import axios from "axios";

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:3000/usuarios", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUsuarios(res.data))
      .catch(() => setMensaje("No autorizado o error al cargar usuarios"));
  }, []);

  const cambiarRol = (id_usuario, rol) => {
    axios.put(`http://localhost:3000/usuarios/${id_usuario}/rol`, { rol }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setMensaje("Rol actualizado"))
      .catch(() => setMensaje("Error al actualizar rol"));
  };

  const eliminarUsuario = (id_usuario) => {
    axios.delete(`http://localhost:3000/usuarios/${id_usuario}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setUsuarios(usuarios.filter(u => u.id_usuario !== id_usuario)))
      .catch(() => setMensaje("Error al eliminar usuario"));
  };

  return (
    <div className="container mt-5 bg-dark text-white p-4 rounded">
      <h2 className="text-morado">Gestión de Usuarios</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <table className="table table-striped table-bordered text-black">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id_usuario}>
              <td>{u.id_usuario}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <select value={u.rol} onChange={e => cambiarRol(u.id_usuario, e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="gestor">Gestor</option>
                  <option value="visitante">Visitante</option>
                </select>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => eliminarUsuario(u.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosAdmin;
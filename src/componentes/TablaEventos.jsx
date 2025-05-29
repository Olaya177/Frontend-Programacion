import React, { useState, useEffect } from "react";
import axios from "axios";

function TablaEventos() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Recuperar usuario desde el token en localStorage
  let usuario = null;
  const token = localStorage.getItem("token");
  if (token) {
    try {
      usuario = JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      usuario = null;
    }
  }

  useEffect(() => {
    axios.get("https://backend-programacion.onrender.com/eventos")
      .then(res => {
        setEventos(res.data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  const inscribirse = async (id_evento) => {
    if (!token) {
      alert("Debes iniciar sesión para inscribirte.");
      return;
    }
    try {
      await axios.post(
        `https://backend-programacion.onrender.com/eventos/${id_evento}/inscribirse`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Inscripción exitosa");
    } catch (err) {
      alert(err.response?.data?.error || "Error al inscribirse");
    }
  };

  if (cargando) return <div>Cargando eventos...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Eventos Registrados</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Lugar</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Capacidad Máxima</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.id_evento}>
              <td>{evento.lugar}</td>
              <td>{evento.tipo_evento}</td>
              <td>{evento.descripcion_evento}</td>
              <td>{evento.fecha_inicio}</td>
              <td>{evento.fecha_fin}</td>
              <td>{evento.capacidad_maxima}</td>
              <td>{evento.estado}</td>
              <td>
                {usuario?.rol === "visitante" && (
                  <button className="btn btn-morado btn-sm" onClick={() => inscribirse(evento.id_evento)}>
                    Inscribirse
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEventos;
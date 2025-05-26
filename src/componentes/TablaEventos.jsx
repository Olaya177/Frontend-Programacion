import { useEffect, useState } from "react";
import axios from "axios";

function TablaEventos() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get("https://backend-programacion.onrender.com/eventos")
      .then(res => {
        setEventos(res.data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {eventos.map(evento => (
            <tr key={evento.id_evento}>
              <td>{evento.lugar}</td>
              <td>{evento.tipo_evento}</td>
              <td>{evento.descripcion_evento}</td>
              <td>{new Date(evento.fecha_inicio).toLocaleString()}</td>
              <td>{new Date(evento.fecha_fin).toLocaleString()}</td>
              <td>{evento.capacidad_maxima}</td>
              <td>{evento.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEventos;
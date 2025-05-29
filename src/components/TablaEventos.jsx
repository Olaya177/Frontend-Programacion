import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Ajusta la ruta según tu proyecto

function TablaEventos({ eventos, recargarEventos }) {
  const { usuario } = useContext(AuthContext);

  const inscribirse = async (id_evento) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `https://backend-programacion.onrender.com/eventos/${id_evento}/inscribirse`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Inscripción exitosa");
      if (recargarEventos) recargarEventos();
    } catch (err) {
      alert(err.response?.data?.error || "Error al inscribirse");
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Lugar</th>
          <th>Tipo</th>
          <th>Descripción</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Capacidad</th>
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
                <button onClick={() => inscribirse(evento.id_evento)}>
                  Inscribirse
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaEventos;
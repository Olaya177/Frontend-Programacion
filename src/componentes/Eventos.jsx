// Este archivo implementa las operaciones CRUD para gestionar eventos.
import { useEffect, useState } from "react";
import axios from "axios";

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState({
    lugar: "",
    tipo_evento: "",
    descripcion_evento: "",
    fecha_inicio: "",
    fecha_fin: "",
    capacidad_maxima: "",
    estado: "activo",
  });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("token");

  // Cargar eventos al iniciar
  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = () => {
    axios
      .get("https://backend-programacion.onrender.com/eventos")
      .then((res) => setEventos(res.data))
      .catch(() => setMensaje("Error al cargar eventos"));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setForm({
      lugar: "",
      tipo_evento: "",
      descripcion_evento: "",
      fecha_inicio: "",
      fecha_fin: "",
      capacidad_maxima: "",
      estado: "activo",
    });
    setEditando(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");
    if (editando) {
      // Editar evento
      axios
        .put(
          `https://backend-programacion.onrender.com/eventos/${editando}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setMensaje("Evento actualizado correctamente");
          cargarEventos();
          limpiarFormulario();
        })
        .catch(() => setMensaje("Error al actualizar evento"));
    } else {
      // Crear evento
      axios
        .post(
          "https://backend-programacion.onrender.com/eventos",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setMensaje("Evento creado correctamente");
          cargarEventos();
          limpiarFormulario();
        })
        .catch(() => setMensaje("Error al crear evento"));
    }
  };

  const handleEditar = (evento) => {
    setEditando(evento.id_evento);
    setForm({
      lugar: evento.lugar,
      tipo_evento: evento.tipo_evento,
      descripcion_evento: evento.descripcion_evento,
      fecha_inicio: evento.fecha_inicio.slice(0, 16),
      fecha_fin: evento.fecha_fin.slice(0, 16),
      capacidad_maxima: evento.capacidad_maxima,
      estado: evento.estado,
    });
  };

  const handleEliminar = (id_evento) => {
    if (!window.confirm("¿Seguro que deseas eliminar este evento?")) return;
    axios
      .delete(`https://backend-programacion.onrender.com/eventos/${id_evento}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setMensaje("Evento eliminado correctamente");
        cargarEventos();
      })
      .catch(() => setMensaje("Error al eliminar evento"));
  };

  return (
    <div className="container mt-5 bg-dark text-white p-4 rounded">
      <h2 className="text-morado mb-4">
        {editando ? "Editar Evento" : "Crear Evento"}
      </h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              name="lugar"
              placeholder="Lugar"
              value={form.lugar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              name="tipo_evento"
              placeholder="Tipo de evento"
              value={form.tipo_evento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              name="capacidad_maxima"
              type="number"
              placeholder="Capacidad máxima"
              value={form.capacidad_maxima}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              className="form-control"
              name="fecha_inicio"
              type="datetime-local"
              placeholder="Fecha inicio"
              value={form.fecha_inicio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              className="form-control"
              name="fecha_fin"
              type="datetime-local"
              placeholder="Fecha fin"
              value={form.fecha_fin}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            name="descripcion_evento"
            placeholder="Descripción"
            value={form.descripcion_evento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <select
            className="form-control"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value="activo">Activo</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>
        <button className="btn btn-morado me-2" type="submit">
          {editando ? "Actualizar" : "Crear"}
        </button>
        {editando && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={limpiarFormulario}
          >
            Cancelar
          </button>
        )}
      </form>

      <h3 className="text-morado mb-3">Lista de Eventos</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-black">
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
                <td>{new Date(evento.fecha_inicio).toLocaleString()}</td>
                <td>{new Date(evento.fecha_fin).toLocaleString()}</td>
                <td>{evento.capacidad_maxima}</td>
                <td>{evento.estado}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditar(evento)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(evento.id_evento)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {eventos.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No hay eventos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Eventos;
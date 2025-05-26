// Este archivo define la estructura principal de la aplicación y las rutas.
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Inicio from "./componentes/Inicio"; // Página de inicio
import Eventos from "./componentes/Eventos"; // Página para gestionar eventos
import Login from "./componentes/Login"; // Página de inicio de sesión
import Registro from "./componentes/Registro"; // Página de registro
import UsuariosAdmin from "./componentes/UsuariosAdmin"; // Página de gestión de usuarios
import "bootstrap/dist/css/bootstrap.min.css"; // Estilos de Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Scripts de Bootstrap
import "./App.css"; // Estilos personalizados

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Recuperar usuario del token si existe
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsuario(payload);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
  };

  return (
    <Router>
      {/* Barra de navegación */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-morado border-bottom border-light w-100 fixed-top" style={{ minWidth: "100vw" }}>
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            Eventos Motocross
          </a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {/* Enlaces de navegación */}
              <Link to="/" className="nav-link text-white">
                Inicio
              </Link>
              {!usuario && (
                <>
                  <Link to="/login" className="nav-link text-white">
                    Iniciar Sesión
                  </Link>
                  <Link to="/registro" className="nav-link text-white">
                    Registrarse
                  </Link>
                </>
              )}
              {usuario?.rol === "gestor" && (
                <Link to="/eventos" className="nav-link text-white">
                  Gestionar Eventos
                </Link>
              )}
              {usuario?.rol === "admin" && (
                <Link to="/usuarios" className="nav-link text-white">
                  Gestión Usuarios
                </Link>
              )}
              {usuario && (
                <button
                  className="btn btn-danger ms-2"
                  onClick={logout}
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Definición de rutas */}
      <Routes>
        <Route path="/" element={<Inicio />} /> {/* Página de inicio */}
        <Route path="/login" element={<Login setUsuario={setUsuario} />} /> {/* Página de inicio de sesión */}
        <Route path="/registro" element={<Registro />} /> {/* Página de registro */}
        <Route path="/eventos" element={usuario?.rol === "gestor" ? <Eventos /> : <Login setUsuario={setUsuario} />} /> {/* Página de eventos */}
        <Route path="/usuarios" element={usuario?.rol === "admin" ? <UsuariosAdmin /> : <Login setUsuario={setUsuario} />} /> {/* Página de gestión de usuarios */}
      </Routes>
    </Router>
  );
}

export default App;
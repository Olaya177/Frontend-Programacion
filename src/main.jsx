// Este archivo es el punto de entrada de la aplicación React.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Importa el componente principal de la aplicación
import "./index.css"; // Estilos globales
import "bootstrap/dist/css/bootstrap.min.css"; // Estilos de Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css"; // Iconos de Bootstrap

// Renderiza la aplicación dentro del elemento con ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App /> {/* Componente principal */}
  </React.StrictMode>
);

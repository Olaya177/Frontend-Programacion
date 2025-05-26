import TablaEventos from "./TablaEventos";

// Este archivo contiene la página de inicio con información sobre motocross.
function Inicio() {
  return (
    <div className="container mt-5 text-center bg-dark text-white p-4 rounded">
      {/* Título principal */}
      <h1 className="text-morado">Motocross en Colombia</h1>
      <p className="mt-3">
        La página está dedicada a brindar información sobre el motocross en Colombia y la creación de eventos relacionados en el país.
      </p>

      {/* Sección sobre tipos de motos */}
      <h2 className="text-morado mt-4">Tipos de Motos Utilizadas en Motocross</h2>
      <p>
        Para practicar Motocross en Colombia y cualquier parte del mundo, es sumamente importante contar con la moto adecuada. Aunque existen diferentes categorías, las motos de Motocross más comunes son las de cilindrada de 125cc, 250cc y 450cc.
      </p>
      <ul className="text-start">
        <li>Un sistema de suspensión potente y robusto</li>
        <li>Neumáticos de tacos para un mejor agarre</li>
        <li>Alta potencia para superar obstáculos y acelerar rápidamente</li>
        <li>Generalmente no incluyen espejos ni faros, por lo que solo pueden circular en pistas especializadas</li>
      </ul>

      {/* Sección sobre equipamiento necesario */}
      <h2 className="text-morado mt-4">¿Qué se necesita para practicar Motocross?</h2>
      <p>
        Para practicar motocross, además de la motocicleta adecuada, también necesitas la seguridad y el equipamiento que te proteja. Te compartimos los 5 esenciales recomendados por los expertos de Fox Colombia:
      </p>
      <ul className="text-start">
        <li>Casco de Motocross</li>
        <li>Gafas protectoras</li>
        <li>Guantes y Botas de Motocross</li>
        <li>Rodilleras y Coderas</li>
        <li>Pantalones y Camiseta de Motocross</li>
      </ul>

      {/* Sección sobre lugares para practicar */}
      <h2 className="text-morado mt-4">¿Dónde Practicar Motocross en Colombia?</h2>
      <p>
        Colombia ofrece una variedad de pistas y circuitos para aquellos que quieran adentrarse en el mundo del Motocross. A continuación, destacamos algunos de los lugares más reconocidos en el país para la práctica de esta emocionante disciplina:
      </p>
      <ul className="text-start">
        <li>
          <strong>Pista de Motocross Guiller Escobar – Antioquia:</strong> Ubicada en 25, Girardota, Antioquia, es un referente para los amantes del Motocross. Ofrece un circuito desafiante con saltos, curvas cerradas y rectas de alta velocidad, todo rodeado de un entorno natural.
        </li>
        <li>
          <strong>Pista Motocross Road Track Guarne:</strong> En Guarne-Aeropuerto José María Córdova, Antioquia, se localiza otra opción imperdible para los entusiastas del Motocross. Con una pista técnica bien mantenida, brinda una experiencia de conducción emocionante para pilotos de todos los niveles.
        </li>
        <li>
          <strong>Pista de Motocross Santander:</strong> Ubicada en la ciudad de Bucaramanga, esta pista es conocida por su terreno variado y desafiante que pone a prueba las habilidades de los pilotos.
        </li>
        <li>
          <strong>Pista de Motocross del Parque la Florida:</strong> En Bogotá, esta pista es un destino popular para los habitantes de la ciudad y los amantes del Motocross. Ofrece una pista bien diseñada donde incluso se llevan a cabo importantes campeonatos.
        </li>
        <li>
          <strong>Pista de Motocross del Parque Mirador:</strong> Rodeada de paisajes impresionantes en los alrededores de Ibagué, esta pista proporciona un entorno excepcional y un desafío emocionante para los pilotos.
        </li>
      </ul>
      <p className="mt-4">
        En conclusión, Colombia ofrece una variedad de opciones emocionantes para aquellos que deseen adentrarse en el mundo del Motocross. Ya sea que seas un principiante o un piloto experimentado, estos lugares proporcionan la oportunidad de mejorar tus habilidades y disfrutar de la emoción de este apasionante deporte.
      </p>

      {/* Tabla de eventos registrados */}
      <div className="mt-5">
        <TablaEventos />
      </div>
    </div>
  );
}

export default Inicio;
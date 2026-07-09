import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header className="top-header">
        <h1>Eventos Universitarios</h1>
      </header>

      <nav className="side-menu">
        <Link to="/">Inicio</Link>
        <Link to="/events">Eventos</Link>
        <Link to="/events/new">Nuevo Evento</Link>
        <Link to="/participants">Participantes</Link>
        <Link to="/enrollments">Inscripciones</Link>
      </nav>
    </>
  );
}

export default Navbar;

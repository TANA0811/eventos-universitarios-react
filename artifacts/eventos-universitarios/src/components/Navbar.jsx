import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Eventos Universitarios
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">Inicio</Link>
          <Link className="nav-link" to="/events">Eventos</Link>
          <Link className="nav-link" to="/events/new">Nuevo Evento</Link>
          <Link className="nav-link" to="/participants">Participantes</Link>
          <Link className="nav-link" to="/enrollments">Inscripciones</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

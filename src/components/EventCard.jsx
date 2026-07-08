import { Link } from "react-router-dom";

function EventCard({ event, onDelete }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <span className="badge bg-info text-dark mb-2">{event.category}</span>
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">{event.description}</p>
        <p className="mb-1"><strong>Fecha:</strong> {event.date}</p>
        <p className="mb-1"><strong>Hora:</strong> {event.time}</p>
        <p className="mb-3"><strong>Lugar:</strong> {event.location}</p>

        <div className="d-flex gap-2">
          <Link className="btn btn-warning btn-sm" to={`/events/edit/${event.id}`}>
            Editar
          </Link>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(event.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;

import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { deleteEvent, getEvents } from "../services/eventService";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este evento?");
    if (!confirmDelete) return;

    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error al eliminar evento:", error);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.category.toLowerCase().includes(search.toLowerCase()) ||
    event.location.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Cargando eventos...</p>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Eventos Académicos</h2>
        <span className="badge bg-primary">{filteredEvents.length} eventos</span>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Buscar por título, categoría o lugar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row g-4">
        {filteredEvents.map((event) => (
          <div className="col-md-6 col-lg-4" key={event.id}>
            <EventCard event={event} onDelete={handleDelete} />
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="alert alert-warning mt-4">
          No se encontraron eventos con ese criterio de búsqueda.
        </div>
      )}
    </section>
  );
}

export default Events;

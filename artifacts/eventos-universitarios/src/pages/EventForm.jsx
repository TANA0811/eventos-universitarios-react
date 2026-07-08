import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEvent, getEventById, updateEvent } from "../services/eventService";

function EventForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "Conferencia",
  });

  useEffect(() => {
    const loadEvent = async () => {
      if (!isEditing) return;

      try {
        const data = await getEventById(id);
        setForm(data);
      } catch (error) {
        console.error("Error al cargar evento:", error);
      }
    };

    loadEvent();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateEvent(id, form);
        alert("Evento actualizado correctamente");
      } else {
        await createEvent(form);
        alert("Evento registrado correctamente");
      }

      navigate("/events");
    } catch (error) {
      console.error("Error al guardar evento:", error);
      alert("No se pudo guardar el evento");
    }
  };

  return (
    <section>
      <h2 className="mb-4">
        {isEditing ? "Actualizar Evento" : "Registrar Nuevo Evento"}
      </h2>

      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título del evento</label>
          <input
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Hora</label>
            <input
              type="time"
              className="form-control"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Lugar</label>
          <input
            className="form-control"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option>Conferencia</option>
            <option>Taller</option>
            <option>Seminario</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            rows="4"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          {isEditing ? "Actualizar Evento" : "Guardar Evento"}
        </button>
      </form>
    </section>
  );
}

export default EventForm;

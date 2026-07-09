import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import { getParticipants } from "../services/participantService";
import { createEnrollment, getEnrollments } from "../services/enrollmentService";

function Enrollments() {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [form, setForm] = useState({
    eventId: "",
    participantId: "",
  });

  const loadData = async () => {
    try {
      const eventsData = await getEvents();
      const participantsData = await getParticipants();
      const enrollmentsData = await getEnrollments();

      setEvents(eventsData);
      setParticipants(participantsData);
      setEnrollments(enrollmentsData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.eventId || !form.participantId) {
      alert("Selecciona un evento y un participante");
      return;
    }

    const alreadyEnrolled = enrollments.some(
      (enrollment) =>
        String(enrollment.eventId) === String(form.eventId) &&
        String(enrollment.participantId) === String(form.participantId)
    );

    if (alreadyEnrolled) {
      alert("Este participante ya está inscrito en ese evento");
      return;
    }

    try {
      const newEnrollment = await createEnrollment({
        eventId: String(form.eventId),
        participantId: String(form.participantId),
      });

      setEnrollments([...enrollments, newEnrollment]);

      setForm({
        eventId: "",
        participantId: "",
      });

      alert("Inscripción registrada correctamente");
    } catch (error) {
      console.error("Error al registrar inscripción:", error);
      alert("No se pudo registrar la inscripción");
    }
  };

  const getEventTitle = (eventId) => {
    const event = events.find((item) => String(item.id) === String(eventId));
    return event ? event.title : "Evento no encontrado";
  };

  const getParticipantName = (participantId) => {
    const participant = participants.find(
      (item) => String(item.id) === String(participantId)
    );
    return participant ? participant.name : "Participante no encontrado";
  };

  const validEnrollments = enrollments.filter((enrollment) => {
    const eventExists = events.some(
      (event) => String(event.id) === String(enrollment.eventId)
    );

    const participantExists = participants.some(
      (participant) =>
        String(participant.id) === String(enrollment.participantId)
    );

    return eventExists && participantExists;
  });

  return (
    <section>
      <h2 className="mb-4">Inscripciones a Eventos</h2>

      <div className="row g-4">
        <div className="col-md-5">
          <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
            <h4 className="mb-3">Nueva Inscripción</h4>

            <div className="mb-3">
              <label className="form-label">Evento</label>
              <select
                className="form-select"
                name="eventId"
                value={form.eventId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar evento</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Participante</label>
              <select
                className="form-select"
                name="participantId"
                value={form.participantId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar participante</option>
                {participants.map((participant) => (
                  <option key={participant.id} value={participant.id}>
                    {participant.name} - {participant.role}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary" type="submit">
              Registrar Inscripción
            </button>
          </form>
        </div>

        <div className="col-md-7">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Participantes Inscritos</h4>

            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead>
                  <tr>
                    <th>Evento</th>
                    <th>Participante</th>
                  </tr>
                </thead>

                <tbody>
                  {validEnrollments.map((enrollment) => (
                    <tr key={enrollment.id}>
                      <td>{getEventTitle(enrollment.eventId)}</td>
                      <td>{getParticipantName(enrollment.participantId)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {validEnrollments.length === 0 && (
              <div className="alert alert-warning">
                No hay inscripciones registradas.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Enrollments;

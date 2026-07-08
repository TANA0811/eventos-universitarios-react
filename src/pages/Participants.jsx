import { useEffect, useState } from "react";
import { createParticipant, getParticipants } from "../services/participantService";

function Participants() {
  const [participants, setParticipants] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Estudiante",
  });

  const loadParticipants = async () => {
    try {
      const data = await getParticipants();
      setParticipants(data);
    } catch (error) {
      console.error("Error al cargar participantes:", error);
    }
  };

  useEffect(() => {
    loadParticipants();
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

    try {
      const newParticipant = await createParticipant(form);
      setParticipants([...participants, newParticipant]);

      setForm({
        name: "",
        email: "",
        role: "Estudiante",
      });

      alert("Participante registrado correctamente");
    } catch (error) {
      console.error("Error al registrar participante:", error);
      alert("No se pudo registrar el participante");
    }
  };

  return (
    <section>
      <h2 className="mb-4">Gestión de Participantes</h2>

      <div className="row g-4">
        <div className="col-md-5">
          <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
            <h4 className="mb-3">Registrar Participante</h4>

            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select
                className="form-select"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option>Estudiante</option>
                <option>Docente</option>
              </select>
            </div>

            <button className="btn btn-primary" type="submit">
              Guardar Participante
            </button>
          </form>
        </div>

        <div className="col-md-7">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Lista de Participantes</h4>

            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                  </tr>
                </thead>

                <tbody>
                  {participants.map((participant) => (
                    <tr key={participant.id}>
                      <td>{participant.name}</td>
                      <td>{participant.email}</td>
                      <td>
                        <span className="badge bg-secondary">
                          {participant.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {participants.length === 0 && (
              <div className="alert alert-warning">
                No hay participantes registrados.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Participants;

function Home() {
  return (
    <section className="text-center">
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <h1 className="display-5 fw-bold">Plataforma de Eventos Universitarios</h1>
        <p className="lead">
          Sistema web para gestionar eventos académicos, conferencias,
          talleres y seminarios dirigidos a estudiantes y docentes.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h4>Gestión de Eventos</h4>
              <p>Registrar, visualizar, buscar y eliminar eventos académicos.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h4>Participantes</h4>
              <p>Registrar estudiantes y docentes que participarán en los eventos.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h4>Inscripciones</h4>
              <p>Inscribir participantes en conferencias, talleres y seminarios.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

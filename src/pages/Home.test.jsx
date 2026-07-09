import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  test('muestra el título principal de la plataforma', () => {
    render(<Home />);

    expect(
      screen.getByText(/Plataforma de Eventos Universitarios/i)
    ).toBeInTheDocument();
  });

  test('muestra las secciones principales del sistema', () => {
    render(<Home />);

    expect(screen.getByText(/Gestión de Eventos/i)).toBeInTheDocument();

    expect(
      screen.getAllByText(/Participantes/i).length
    ).toBeGreaterThan(0);

    expect(
      screen.getAllByText(/Inscripciones/i).length
    ).toBeGreaterThan(0);
  });
});

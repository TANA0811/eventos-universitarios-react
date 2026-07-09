import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventCard from './EventCard';

const eventMock = {
  id: 1,
  title: 'Taller de React',
  date: '2026-07-25',
  time: '15:00',
  location: 'Laboratorio de Sistemas',
  description: 'Taller práctico de desarrollo frontend con React.',
  category: 'Taller'
};

describe('EventCard', () => {
  test('muestra la información del evento', () => {
    render(
      <BrowserRouter>
        <EventCard event={eventMock} onDelete={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Taller de React/i)).toBeInTheDocument();
    expect(screen.getByText(/Laboratorio de Sistemas/i)).toBeInTheDocument();
    expect(screen.getByText(/Taller práctico/i)).toBeInTheDocument();
  });

  test('muestra botones de editar y eliminar', () => {
    render(
      <BrowserRouter>
        <EventCard event={eventMock} onDelete={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Editar/i)).toBeInTheDocument();
    expect(screen.getByText(/Eliminar/i)).toBeInTheDocument();
  });
});

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventForm from "./pages/EventForm";
import Participants from "./pages/Participants";
import Enrollments from "./pages/Enrollments";

function App() {
  return (
    <>
      <Navbar />

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/new" element={<EventForm />} />
          <Route path="/events/edit/:id" element={<EventForm />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/enrollments" element={<Enrollments />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

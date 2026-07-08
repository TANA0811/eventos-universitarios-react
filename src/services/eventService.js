import api from "../api/axiosConfig";

export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const createEvent = async (event) => {
  const response = await api.post("/events", event);
  return response.data;
};

export const updateEvent = async (id, event) => {
  const response = await api.put(`/events/${id}`, event);
  return response.data;
};

export const deleteEvent = async (id) => {
  await api.delete(`/events/${id}`);
};

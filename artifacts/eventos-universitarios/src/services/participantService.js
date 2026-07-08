import api from "../api/axiosConfig";

export const getParticipants = async () => {
  const response = await api.get("/participants");
  return response.data;
};

export const createParticipant = async (participant) => {
  const response = await api.post("/participants", participant);
  return response.data;
};

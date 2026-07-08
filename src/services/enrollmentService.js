import api from "../api/axiosConfig";

export const getEnrollments = async () => {
  const response = await api.get("/enrollments");
  return response.data;
};

export const createEnrollment = async (enrollment) => {
  const response = await api.post("/enrollments", enrollment);
  return response.data;
};

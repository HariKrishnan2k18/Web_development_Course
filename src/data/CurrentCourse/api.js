import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
export const getUserData = async ({ payload }) => {
  const response = axios
    .post(`${API_URL}/users`, {
      user: payload.user,
      password: payload.password,
    })
    .then((res) => res.data);
  return response;
};

export const getRegisterData = async ({ payload }) => {
  const response = axios
    .post(`${API_URL}/users/register`, payload)
    .then((res) => res.data);
  return response;
};

export const getCourseDetails = async () => {
  const response = axios
    .get(`${API_URL}/coursedetails/list`)
    .then((res) => res.data);
  return response;
};

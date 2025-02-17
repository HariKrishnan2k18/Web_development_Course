import axios from "axios";

const API_URL = String(process.env.REACT_APP_USER_API_URL);
export const getUserData = async ({payload}) => {
    const response = axios
    .post(`${API_URL}/users`, {
      user: payload.user,
      password: payload.password
    })
    .then((res) => res.data);
    return response
}
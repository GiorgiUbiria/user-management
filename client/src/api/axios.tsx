import Axios from "axios";

const BASE_URL = "http://localhost:8080";

export default Axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = Axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

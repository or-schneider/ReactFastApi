import axios from "axios";

export default function initAxios() {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  axios.defaults.baseURL = apiBaseUrl;
}

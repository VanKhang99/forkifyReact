import axios from "axios";
import { API_URL } from "../utils/helper";

const customFetch = axios.create({
  baseURL: `${API_URL}`,
  timeout: 10000,
});

export default customFetch;

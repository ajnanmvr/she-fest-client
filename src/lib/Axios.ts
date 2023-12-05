import axios from "axios";
import { SERVER_URL } from "./urql";

const Axios = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
  withCredentials: true,
});

export default Axios;
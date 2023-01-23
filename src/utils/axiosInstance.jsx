/** @format */

import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

export const HttpRequest = axios.create({
   baseURL: BASE_URL,
   withCredentials: true,
});

/** @format */

import axios from "axios";
const BASE_URL = "https://kagets-server.cyclic.app/api";

export const HttpRequest = axios.create({
   baseURL: BASE_URL,
   withCredentials: true,
});

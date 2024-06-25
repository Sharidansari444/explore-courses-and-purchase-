import axios from "axios";

const BASE_URL = "http://localhost:5000/v1"

const axiosInstant  = axios.create()


axiosInstant.defaults.baseURL = BASE_URL;
axiosInstant.defaults.withCredentials = true    
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://api.green-api.com/",
  validateStatus(status) {
    return status >= 200
  },
  headers: {
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
  },
})

export default axiosInstance

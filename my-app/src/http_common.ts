import axios from "axios";

const http = axios.create({
  baseURL: "http://laravel.php.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;

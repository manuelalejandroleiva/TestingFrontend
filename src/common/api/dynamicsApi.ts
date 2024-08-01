import axios from 'axios';

export const dynamicsApi = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Accept: 'application/json',
  },
});

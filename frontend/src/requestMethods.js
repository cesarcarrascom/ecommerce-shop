import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTYxY2YxYTQ1NjBjYTIwMzI3NTBiYjMiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MzQxNjUyMjMsImV4cCI6MTYzNjc1NzIyM30.Zci2ZnwIWZU6FRFhBjsfjhilMqF-9eJBCrq_W3r1_fc";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});

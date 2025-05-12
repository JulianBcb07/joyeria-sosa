// libreria que importa fetch para hacer peticiones
import axios from "./axios";

export const loginRequest = (user) => axios.post(`/api/login`, user);

export const logoutRequest = () => axios.post("/api/logout");

export const verifyTokenRequest = () => axios.get("/api/verify");

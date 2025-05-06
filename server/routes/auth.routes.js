import { Router } from "express";
import {
  login,
  register,
  logout,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const routerLogin = Router();

routerLogin.post("/login", login);
routerLogin.post("/register", register);
routerLogin.post("/logout", logout);
routerLogin.get("/verify", verifyToken);

export default routerLogin;

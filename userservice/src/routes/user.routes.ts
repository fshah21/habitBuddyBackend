import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const userRoutes = Router();

userRoutes.post("/users/createUser", UserController.createUser);
userRoutes.post("/users/login", UserController.login);

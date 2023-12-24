import { Router } from "express";
import { getUsers, getCurrentUser, CreateUser } from "../controllers/user";

const userRoutes = Router();

userRoutes.get("/users", getUsers);
userRoutes.get("/users/:userId", getCurrentUser);
userRoutes.post("/users", CreateUser);

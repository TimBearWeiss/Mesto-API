import { Router } from "express";
import { getUsers, getCurrentUser, CreateUser } from "../controllers/user";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.get("/:userId", getCurrentUser);
userRoutes.post("/", CreateUser);

export default userRoutes;

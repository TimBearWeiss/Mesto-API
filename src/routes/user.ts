import { Router } from "express";
import {
  getUsers,
  getCurrentUser,
  CreateUser,
  updateProfile,
  updateAvatar,
} from "../controllers/user";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.get("/:userId", getCurrentUser);
userRoutes.post("/", CreateUser);
//
userRoutes.patch("/me", updateProfile);
userRoutes.patch("/me/avatar", updateAvatar);

export default userRoutes;

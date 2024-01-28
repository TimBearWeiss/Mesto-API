import { Router } from "express";
import {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  getAuthUser,
} from "../controllers/user";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.get("/:userId", getCurrentUser);
userRoutes.get("/me", getAuthUser);
//
userRoutes.patch("/me", updateProfile);
userRoutes.patch("/me/avatar", updateAvatar);

export default userRoutes;

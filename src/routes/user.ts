import { Router } from "express";
import {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  getAuthUser,
} from "../controllers/user";
const celebrates = require("../middlewares/celebrates");

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.get("/me", getAuthUser);
userRoutes.get("/:userId", celebrates.getCurrentUser, getCurrentUser);
//
userRoutes.patch("/me", celebrates.updateProfile, updateProfile);
userRoutes.patch("/me/avatar", celebrates.updateAvatar, updateAvatar);

export default userRoutes;

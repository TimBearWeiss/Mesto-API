import { Router } from "express";
import userRoutes from "./user";
import cardRoutes from "./card";

const router = Router();

router.use("/users", userRoutes);
router.use("/cards", cardRoutes);

export default router;

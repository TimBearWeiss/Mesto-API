import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import userRoutes from "./user";
import cardRoutes from "./card";

const router = Router();

router.use("/users", userRoutes);
router.use("/cards", cardRoutes);
router.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ message: "Ресурс не найден" });
});

export default router;

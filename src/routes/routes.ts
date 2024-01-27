import { Request, Response, Router } from "express";
import userRoutes from "./user";
import cardRoutes from "./card";
import { createUser, login } from "controllers/user";

const router = Router();

router.use("/users", userRoutes);
router.use("/cards", cardRoutes);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req: Request, res: Response) => {
  res.status(404).send({ message: "Ресурс не найден" });
});

export default router;

import { Request, Response, Router } from "express";
import userRoutes from "./user";
import cardRoutes from "./card";
import { createUser, login } from "controllers/user";
import { auth } from "middlewares/auth";

const router = Router();

router.post("/signin", login);
router.post("/signup", createUser);
/// защищены авторизацией
router.use("/users", auth, userRoutes);
router.use("/cards", auth, cardRoutes);

router.use((req: Request, res: Response) => {
  res.status(404).send({ message: "Ресурс не найден" });
});

export default router;

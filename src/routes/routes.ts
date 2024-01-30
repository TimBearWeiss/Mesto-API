import { Request, Response, Router } from "express";
import userRoutes from "./user";
import cardRoutes from "./card";
import { createUser, login } from "controllers/user";
import { auth } from "middlewares/auth";
import { notFound } from "../constans/errors";
const celebrates = require("../middlewares/celebrates");

const router = Router();

router.post("/signin", celebrates.login, login);
router.post("/signup", celebrates.createUser, createUser);
/// защищены авторизацией
router.use("/users", auth, userRoutes);
router.use("/cards", auth, cardRoutes);

router.use((req: Request, res: Response) => {
  res.status(notFound).send({ message: "Ресурс не найден" });
});

export default router;

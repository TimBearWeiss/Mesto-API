import { Router } from "express";
import { getCards, creatCard, deleteCard } from "../controllers/card";

const cardRoutes = Router();

cardRoutes.get("/", getCards);
cardRoutes.post("/", creatCard);
cardRoutes.delete("/:cardId", deleteCard);

export default cardRoutes;

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору

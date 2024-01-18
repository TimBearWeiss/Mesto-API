import { Router } from "express";
import { getCards, createCard, deleteCard } from "../controllers/card";

const cardRoutes = Router();

cardRoutes.get("/", getCards);
cardRoutes.post("/", createCard);
cardRoutes.delete("/:cardId", deleteCard);

export default cardRoutes;

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору

import { Router } from "express";
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/card";
const celebrates = require("../middlewares/celebrates");

const cardRoutes = Router();

cardRoutes.get("/", getCards);
cardRoutes.post("/", celebrates.createCard, createCard);
cardRoutes.delete("/:cardId", celebrates.validIdCard, deleteCard);
//
cardRoutes.put("/:cardId/likes", celebrates.validIdCard, likeCard);
cardRoutes.delete("/:cardId/likes", celebrates.validIdCard, dislikeCard);

export default cardRoutes;

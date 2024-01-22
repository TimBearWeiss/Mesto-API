import { Request, Response, NextFunction } from "express";
import {
  Internal_Server_Error,
  Bad_Request,
  Not_Found,
} from "../constans/errors";
import Card from "../models/card";

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() =>
      res.status(Internal_Server_Error).send({ message: "Произошла ошибка" })
    );
};

export const createCard = (req: Request, res: Response) => {
  console.log(req.user._id); // _id станет доступен
  const { name, link } = req.body;
  const { _id } = req.user!;

  Card.create({ name, link, owner: _id })
    .then((user) => res.send(user))

    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(Bad_Request).send("Ошибка валидации");
      } else {
        res.status(Internal_Server_Error).send({ message: "Произошла ошибка" });
      }
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res.status(Not_Found).send({ message: "Карточка не найдена" });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(Bad_Request).send("Некорректный id карточки");
      } else {
        res.status(Internal_Server_Error).send({ message: "Произошла ошибка" });
      }
    });
};

///

const updateLike = (
  req: Request,
  res: Response,
  next: NextFunction,
  method: string
) => {
  const { cardId } = req.params;
  const { _id } = req.user!;

  Card.findByIdAndUpdate(cardId, { [method]: { likes: _id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(Not_Found).send("Карточка не найдена");
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(Bad_Request).send("Некорректный id карточки");
      } else {
        res.status(Internal_Server_Error).send({ message: "Произошла ошибка" });
      }
    });
};

export const likeCard = (req: Request, res: Response, next: NextFunction) =>
  updateLike(req, res, next, "$addToSet");

export const dislikeCard = (req: Request, res: Response, next: NextFunction) =>
  updateLike(req, res, next, "$pull");

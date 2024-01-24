import { Request, Response } from "express";
import { internalServerError, badRequest, notFound } from "../constans/errors";
import Card from "../models/card";

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(internalServerError).send({ message: "Произошла ошибка" });
    });
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const { _id } = req.user!;

  Card.create({ name, link, owner: _id })
    .then((user) => res.send(user))

    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({ message: "Ошибка валидации" });
      } else {
        res.status(internalServerError).send({ message: "Произошла ошибка" });
      }
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res.status(notFound).send({ message: "Карточка не найдена" });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(badRequest).send({ message: "Некорректный id карточки" });
      } else {
        res.status(internalServerError).send({ message: "Произошла ошибка" });
      }
    });
};

///

const updateLike = (req: Request, res: Response, method: string) => {
  const { cardId } = req.params;
  const { _id } = req.user!;

  Card.findByIdAndUpdate(cardId, { [method]: { likes: _id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(notFound).send({ message: "Карточка не найдена" });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(badRequest).send({ message: "Некорректный id карточки" });
      } else {
        res.status(internalServerError).send({ message: "Произошла ошибка" });
      }
    });
};

export const likeCard = (req: Request, res: Response) => {
  updateLike(req, res, "$addToSet");
};

export const dislikeCard = (req: Request, res: Response) => {
  updateLike(req, res, "$pull");
};

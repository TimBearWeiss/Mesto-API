import { Request, Response, NextFunction } from "express";
import { badRequest, notFound } from "../constans/errors";
import Card from "../models/card";

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const { _id } = req.user!;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))

    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({ message: "Ошибка валидации" });
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res.status(notFound).send({ message: "Карточка не найдена" });
      }
      // если айди создателя карточки отличается от айди пользователя
      if (card!.owner.toString() !== userId) {
        res.status(notFound).send({ message: "Чужую карточку нельзя удалить" });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(badRequest).send({ message: "Некорректный id карточки" });
      } else {
        next(err);
      }
    });
};

///

const updateLike = (
  req: Request,
  res: Response,
  method: string,
  next: NextFunction
) => {
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
        next(err);
      }
    });
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  updateLike(req, res, "$addToSet", next);
};

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  updateLike(req, res, "$pull", next);
};

import { Request, Response, NextFunction } from "express";
import Card from "../models/card";

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createCard = (req: Request, res: Response) => {
  console.log(req.user._id); // _id станет доступен
  const { name, link } = req.body;
  const { _id } = req.user!;

  Card.create({ name, link, owner: _id })
    .then((user) => res.send(user))
    // данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
      }
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
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
        res.status(404).send("Карточка не найдена");
      } else {
        res.send(card);
      }
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) =>
  updateLike(req, res, next, "$addToSet");

export const dislikeCard = (req: Request, res: Response, next: NextFunction) =>
  updateLike(req, res, next, "$pull");

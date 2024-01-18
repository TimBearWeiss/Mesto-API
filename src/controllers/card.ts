import { Request, Response } from "express";
import Card from "models/card";

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((user) => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

export const deleteCard = (req: Request, res: Response) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
      }
      res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

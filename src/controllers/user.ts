import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const getCurrentUser = (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("Пользователь не найден");
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send("Произошла ошибка при поиске пользователя: " + error);
    });
};

export const CreateUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

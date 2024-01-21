import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const getCurrentUser = (req: Request, res: Response) => {
  const _id = req.params.userId;

  User.findById(_id)
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
    .then((user) => res.send(user))
    // данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const updateProfile = (req: Request, res: Response) => {
  const { _id } = req.user!;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true }
  )
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

export const updateAvatar = (req: Request, res: Response) => {
  const { _id } = req.user!;
  const { avatar } = req.body;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
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

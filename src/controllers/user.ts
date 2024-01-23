import { Request, Response } from "express";
import { internalServerError, badRequest, notFound } from "../constans/errors";
import User from "../models/user";

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(internalServerError).send({ message: "Произошла ошибка" });
    });
};

export const getCurrentUser = (req: Request, res: Response) => {
  const id = req.params.userId;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(notFound).send({ message: "Пользователь не найден" });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(badRequest)
          .send({ message: "Некорректный id пользователя" });
      } else {
        res.status(internalServerError).send({ message: "Произошла ошибка" });
      }
    });
};

export const CreateUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then((user) => res.send(user))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({ message: "Ошибка валидации" });
      } else {
        res.status(internalServerError).send({ message: "Произошла ошибка" });
      }
    });
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
        res.status(notFound).send({ message: "Пользователь не найден" });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({ message: "Ошибка валидации" });
      } else {
        res.status(internalServerError).send({ message: "Произошла ошибка" });
      }
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
        res.status(notFound).send({ message: "Пользователь не найден" });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({ message: "Ошибка валидации" });
      } else {
        res.status(internalServerError).send({ message: "Произошла ошибка" });
      }
    });
};

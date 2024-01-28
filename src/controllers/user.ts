import { Request, Response } from "express";
import { internalServerError, badRequest, notFound } from "../constans/errors";
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user: any) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });

      // вернём токен
      res.send({ token });
    })
    .catch((err: any) => {
      // ошибка аутентификации
      res.status(401).send({ message: "Ошибка авторизации" });
    });
};

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users: any) => res.send(users))
    .catch(() => {
      res.status(internalServerError).send({ message: "Произошла ошибка" });
    });
};

export const getCurrentUser = (req: Request, res: Response) => {
  const id = req.params.userId;

  User.findById(id)
    .then((user: any) => {
      if (user) {
        res.send(user);
      } else {
        res.status(notFound).send({ message: "Пользователь не найден" });
      }
    })
    .catch((err: any) => {
      if (err.name === "CastError") {
        res
          .status(badRequest)
          .send({ message: "Некорректный id пользователя" });
      } else {
        res.status(internalServerError).send({ message: "Произошла ошибка" });
      }
    });
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash: string) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    // User.create({ name, about, avatar, email, password })
    // вернём записанные в базу данные
    .then((user: any) => res.send(user))
    // данные не записались, вернём ошибку
    .catch((err: any) => {
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
    .then((user: any) => {
      if (user) {
        res.send(user);
      } else {
        res.status(notFound).send({ message: "Пользователь не найден" });
      }
    })
    .catch((err: any) => {
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
    .then((user: any) => {
      if (user) {
        res.send(user);
      } else {
        res.status(notFound).send({ message: "Пользователь не найден" });
      }
    })
    .catch((err: any) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({ message: "Ошибка валидации" });
      } else {
        res.status(internalServerError).send({ message: "Произошла ошибка" });
      }
    });
};

export const getAuthUser = (req: Request, res: Response) => {
  const { _id } = req.user!;

  User.findById(_id)
    .then((user: any) => {
      if (user) {
        res.send(user);
      } else {
        res.status(notFound).send({ message: "Пользователь не найден" });
      }
    })
    .catch((err: any) => {
      if (err.name === "CastError") {
        res
          .status(badRequest)
          .send({ message: "Некорректный id пользователя" });
      } else {
        res.status(internalServerError).send({ message: "Произошла ошибка" });
      }
    });
};

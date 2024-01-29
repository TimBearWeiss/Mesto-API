import { Request, Response, NextFunction } from "express";
import {
  badRequest,
  notFound,
  unauthorizedError,
  conflict,
} from "../constans/errors";
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
    .catch(() => {
      // ошибка аутентификации
      res.status(unauthorizedError).send({ message: "Ошибка авторизации" });
    });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users: any) => res.send(users))
    .catch((err: any) => {
      next(err);
    });
};

export const getCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
        next(err);
      }
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
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
      }
      if (err.code === 11000) {
        res
          .status(conflict)
          .send({ message: "Почта уже используется для другого пользователя" });
      } else {
        next(err);
      }
    });
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
        next(err);
      }
    });
};

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
        next(err);
      }
    });
};

export const getAuthUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
        next(err);
      }
    });
};

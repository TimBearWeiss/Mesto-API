import { Request, Response } from "express";
import User from "../models/user";

const getUsers = (req: Request, res: Response) => {};

const getCurrentUser = (req: Request, res: Response) => {};

const CreateUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

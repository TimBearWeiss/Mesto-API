import { Request, Response, NextFunction } from "express";
import { unauthorizedError } from "constans/errors";
import { secretKey } from "constans/constants";
const jwt = require("jsonwebtoken");

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(unauthorizedError)
      .send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return res
      .status(unauthorizedError)
      .send({ message: "Необходима авторизация" });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

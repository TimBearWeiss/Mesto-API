// import { Request, Response, NextFunction } from "express";

// export const errorHandler = (
//   err,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // если у ошибки нет статуса, выставляем 500
//   const { statusCode = 500, message } = err;

//   res.status(statusCode).send({
//     // проверяем статус и выставляем сообщение в зависимости от него
//     message: statusCode === 500 ? "На сервере произошла ошибка" : message,
//   });
// };

import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err as {
    statusCode?: number;
    message: string;
  };

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
};

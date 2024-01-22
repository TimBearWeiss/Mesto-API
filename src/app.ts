import express from "express";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import router from "./routes/routes";
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// Слушаем 3000 порт
const { PORT = 3000, BASE_PATH } = process.env;

// limiter конфиг
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // 100 запросов с одного IP
});

// Создаём экземпляр приложения Express
const app: express.Express = express();

/// временные файлы
app.get("/", (req, res) => {
  res.send("<h1>Hello express</h1>");
});

app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mestodb");

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: "65a2cd82051721f235930ad0", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
/// подключаем пути
app.use(router);

/// подключаем ограничитель запросов для защиты от DoS-атак.
app.use(limiter);

// защита http заголовков
app.use(helmet());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// http://localhost:3000/

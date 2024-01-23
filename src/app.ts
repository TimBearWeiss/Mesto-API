import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import router from "./routes/routes";
import limiter from "./utils/limiterConfig";

const helmet = require("helmet");

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

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

/// подключаем ограничитель запросов для защиты от DoS-атак.
app.use(limiter);

// защита http заголовков
app.use(helmet());

/// подключаем пути
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// http://localhost:3000/

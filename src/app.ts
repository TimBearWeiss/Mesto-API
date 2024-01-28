import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes";
import limiter from "./utils/limiterConfig";
import { requestLogger, errorLogger } from "./middlewares/logger";
import { errorHandler } from "middlewares/errorHandler";

const helmet = require("helmet");

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// Создаём экземпляр приложения Express
const app: express.Express = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mestodb");

/// подключаем ограничитель запросов для защиты от DoS-атак.
app.use(limiter);

// защита http заголовков
app.use(helmet());

// подключаем логер запросов
app.use(requestLogger);

/// подключаем пути
app.use(router);

// подключаем логер ошибок
app.use(errorLogger);

// обрабатываем централизованно ошибки
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// http://localhost:3000/

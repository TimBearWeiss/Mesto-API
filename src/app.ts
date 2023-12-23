import express from "express";
import mongoose from "mongoose";
// Импортируем типы для объектов запроса и ответа Express
import { Request, Response } from "express";

// Слушаем 3000 порт
const { PORT = 3000, BASE_PATH } = process.env;

// Создаём экземпляр приложения Express
const app: express.Express = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mestodb");

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

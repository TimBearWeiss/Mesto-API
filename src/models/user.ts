import mongoose from "mongoose";
const bcrypt = require("bcryptjs");
const validator = require("validator");

type TUser = {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Введите корректный корректный адрес электронной почты",
    },
  },
  password: { type: String, required: true, select: false },
});

userSchema.static(
  "findUserByCredentials",
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email })
      .select("+password")
      .then((user: any) => {
        if (!user) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }

        return bcrypt.compare(password, user.password).then((matched: any) => {
          if (!matched) {
            return Promise.reject(new Error("Неправильные почта или пароль"));
          }

          return user; // теперь user доступен
        });
      });
  }
);

export default mongoose.model<TUser>("user", userSchema);

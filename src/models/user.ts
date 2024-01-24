import mongoose from "mongoose";
const validator = require("validator");

type TUser = {
  name: string;
  about: string;
  email: string;
  password: string;
  avatar: string;
};

const userSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Введите корректный адрес электронной почты",
    },
  },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
});

export default mongoose.model<TUser>("user", userSchema);

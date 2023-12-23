import mongoose from "mongoose";

type TUser = {
  name: string;
  about: string;
  avatar: string;
};

const userSchema = new mongoose.Schema<TUser>({
  name: { type: String, minlength: 2, maxlength: 30, required: true },
  about: { type: String, minlength: 2, maxlength: 200, required: true },
  avatar: { type: String, required: true },
});

export default mongoose.model<TUser>("user", userSchema);

// name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
// about — информация о пользователе, строка от 2 до 200 символов, обязательное поле;
// avatar — ссылка на аватарку, строка, обязательное поле.

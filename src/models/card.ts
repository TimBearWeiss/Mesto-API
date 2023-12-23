import mongoose from "mongoose";

type TCard = {
  name: String;
  link: String;
  owner: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
};

const cardSchema = new mongoose.Schema<TCard>({
  name: { type: String, minlength: 2, maxlength: 30, required: true },
  link: { type: String, required: true },
  owner: { type: String, ref: "user", required: true },
  likes: { type: [{ type: mongoose.Schema.Types.ObjectId }], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<TCard>("card", cardSchema);

// name — имя карточки, строка от 2 до 30 символов, обязательное поле;
// link — ссылка на картинку, строка, обязательно поле.
// owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
// likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
// createdAt — дата создания, тип Date, значение по умолчанию Date.now.

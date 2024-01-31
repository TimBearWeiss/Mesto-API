import mongoose from "mongoose";
const isPictureLinkValid = require("../utils/validator");

type TCard = {
  name: String;
  link: String;
  owner: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
};

const cardSchema = new mongoose.Schema<TCard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: [isPictureLinkValid, "Невалидная ссылка аватара"],
  },
  owner: { type: String, ref: "user", required: true },
  likes: { type: [{ type: mongoose.Schema.Types.ObjectId }], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<TCard>("card", cardSchema);

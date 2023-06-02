import { Schema, Types, model } from "mongoose";

const figureSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  character: {
    type: String,
    required: true,
  },
  franchise: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  purchased: {
    type: Boolean,
    required: true,
  },
});

const Figure = model("Figure", figureSchema, "figuranis");

export default Figure;

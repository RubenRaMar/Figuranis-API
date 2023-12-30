import { Schema, Types, model } from "mongoose";

const figureSchema = new Schema({
  title: {
    type: String,
    required: true,
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
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  isPurchased: {
    type: Boolean,
    required: true,
  },
});

const Figure = model("Figure", figureSchema, "figures");

export default Figure;

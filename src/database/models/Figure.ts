import { Schema, Types, model } from "mongoose";
import { type FigureData } from "../../types.js";

const figureSchema = new Schema<FigureData>({
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
  user: Types.ObjectId,
  purchased: Boolean,
});

const Figure = model("Figure", figureSchema, "figuranis");

export default Figure;

import { Joi, validate } from "express-validation";
import { type RequestFigureData } from "../types.js";

const figureShema = {
  body: Joi.object<RequestFigureData>({
    title: Joi.string().required(),
    character: Joi.string().required(),
    franchise: Joi.string().required(),
    image: Joi.string().required(),
    manufacturer: Joi.string().required(),
    material: Joi.string().required(),
    price: Joi.number().required(),
    size: Joi.number().required(),
    weight: Joi.number().required(),
    purchased: Joi.boolean().required(),
  }),
};

export const figureValidation = validate(
  figureShema,
  {},
  { abortEarly: false }
);

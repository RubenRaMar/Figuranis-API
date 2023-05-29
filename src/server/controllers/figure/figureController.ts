import { type NextFunction, type Response } from "express";
import type CustomRequest from "./types";
import Figure from "../../../database/models/Figure.js";
import { statusCodeList } from "../../utils/responseData/responseData";

const getFigures = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const figure = await Figure.find({}, { user: userId }).limit(10).exec();

    res.status(statusCodeList.ok).json({ figure });
  } catch (error: unknown) {
    next(error);
  }
};

export default getFigures;

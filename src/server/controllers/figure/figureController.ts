import { type NextFunction, type Response } from "express";
import type CustomRequest from "./types";
import Figure from "../../../database/models/Figure.js";
import { statusCodeList } from "../../utils/responseData/responseData.js";

const getFigures = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const figures = await Figure.find({ user: userId }).limit(10).exec();

    res.status(statusCodeList.ok).json({ figures });
  } catch (error: unknown) {
    next(error);
  }
};

export default getFigures;

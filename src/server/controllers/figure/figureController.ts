import { type Request, type NextFunction, type Response } from "express";
import type CustomRequest from "./types";
import Figure from "../../../database/models/Figure.js";
import { statusCodeList } from "../../utils/responseData/responseData.js";
import { privateMessageList } from "../../utils/responseData/responseData";
import CustomError from "../../Classes/CustomError/CustomError";

export const getFigures = async (
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

export const deleteFigure = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const figureRemoved = await Figure.findByIdAndDelete(id).exec();

    if (!figureRemoved) {
      throw new CustomError(404, privateMessageList.deleteError);
    }

    res.status(statusCodeList.ok).json({ message: privateMessageList.delete });
  } catch (error) {
    next(error);
  }
};

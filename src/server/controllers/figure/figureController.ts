import { type Request, type NextFunction, type Response } from "express";
import type CustomRequestStructure from "./types";
import Figure from "../../../database/models/Figure.js";
import {
  statusCodeList,
  privateMessageList,
} from "../../utils/responseData/responseData.js";
import CustomError from "../../Classes/CustomError/CustomError.js";
import { Types } from "mongoose";

export const getFigures = async (
  req: CustomRequestStructure,
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
      throw new CustomError(
        statusCodeList.notFound,
        privateMessageList.deleteError
      );
    }

    res.status(statusCodeList.ok).json({ message: privateMessageList.delete });
  } catch (error) {
    next(error);
  }
};

export const addFigure = async (
  req: CustomRequestStructure,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, body } = req;

    const addedFigure = await Figure.create({
      ...body,
      user: new Types.ObjectId(userId),
    });

    if (!addedFigure) {
      throw new CustomError(
        statusCodeList.badRequest,
        privateMessageList.addError
      );
    }

    res.status(statusCodeList.add).json({ message: privateMessageList.add });
  } catch (error) {
    next(error);
  }
};

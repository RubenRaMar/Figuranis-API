import { type Request, type NextFunction, type Response } from "express";
import { Types } from "mongoose";
import Figure from "../../../database/models/Figure.js";
import { type CustomRequestUpdate, type CustomRequest } from "./types.js";
import {
  statusCodeList,
  privateMessageList,
} from "../../utils/responseData/responseData.js";
import CustomError from "../../Classes/CustomError/CustomError.js";
import { type RequestUpdateFigureStructure } from "../../../types.js";

export const getFigures = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    query: { limit, page, purchased },
  } = req;

  const defaultLimit = 12;
  const defaultpage = 0;

  const newLimit = limit ? +limit : defaultLimit;
  const newSkip = page ? +page * newLimit : defaultpage;
  const isPurchased = purchased === "true";

  type FigureQueryOptions = {
    [key in keyof RequestUpdateFigureStructure]?: RequestUpdateFigureStructure[key];
  };

  let figureQueryOptions: FigureQueryOptions = {};

  if (userId) {
    figureQueryOptions = { ...figureQueryOptions, userId };
  }

  if (purchased) {
    figureQueryOptions = { ...figureQueryOptions, isPurchased };
  }

  try {
    const figures = await Figure.find(figureQueryOptions)
      .sort({ _id: -1 })
      .skip(newSkip)
      .limit(newLimit)
      .exec();

    const length = await Figure.where(figureQueryOptions)
      .countDocuments()
      .exec();

    res.status(statusCodeList.ok).json({ figures, length });
  } catch (error: unknown) {
    next(error);
  }
};

export const getFigureById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const figure = await Figure.findOne({ _id: id }).exec();

    if (!figure) {
      throw new CustomError(
        statusCodeList.notFound,
        privateMessageList.deleteError
      );
    }

    res.status(statusCodeList.ok).json({ figure });
  } catch (error) {
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
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, body } = req;

    const addedFigure = await Figure.create({
      ...body,
      userId: new Types.ObjectId(userId),
    });

    if (!addedFigure) {
      throw new CustomError(
        statusCodeList.badRequest,
        privateMessageList.addError
      );
    }

    res.status(statusCodeList.add).json({ figure: addedFigure });
  } catch (error) {
    next(error);
  }
};

export const updateFigure = async (
  req: CustomRequestUpdate,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, userId } = req;

    const updatedFigure = await Figure.findByIdAndUpdate(body.id, {
      ...body,
      userId: new Types.ObjectId(userId),
      _id: new Types.ObjectId(body.id),
    }).exec();

    if (!updatedFigure) {
      throw new CustomError(
        statusCodeList.badRequest,
        privateMessageList.updateError
      );
    }

    res.status(statusCodeList.ok).json({ message: privateMessageList.update });
  } catch (error) {
    next(error);
  }
};

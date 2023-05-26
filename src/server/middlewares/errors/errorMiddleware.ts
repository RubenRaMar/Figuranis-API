import { type Request, type Response } from "express";
import { type NextFunction } from "express-serve-static-core";
import createDebug from "debug";

import chalk from "chalk";
import CustomError from "../../Classes/CustomError/CustomError.js";
import {
  privateMessageList,
  publicMessageList,
  statusCodeList,
} from "../../utils/responseData/responseData.js";

const debug = createDebug(
  "figuranisdb-api:server:middlewares:errors:errorMiddleware"
);

export const endpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const statusCode = statusCodeList.endpointNotFound;
  const privatMessage = privateMessageList.endpointNotFound;
  const publicMessage = publicMessageList.endpointNotFound;

  const error = new CustomError(statusCode, privatMessage, publicMessage);

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || statusCodeList.generalError;
  const message = error.statusCode
    ? error.message
    : privateMessageList.generalError;

  debug(chalk.bgRed(statusCode), chalk.red(message));

  res.status(statusCode).json({ message });
};

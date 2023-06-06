import { type NextFunction } from "express-serve-static-core";
import { type Request, type Response } from "express";
import { ValidationError } from "express-validation";
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
  const statusCode = statusCodeList.notFound;
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
  if (error instanceof ValidationError && error.details.body) {
    const validationError = error.details.body
      .map((joiError) => joiError.message.replaceAll('"', ""))
      .join(" & ");

    (error as CustomError).publicMessage = validationError;
    debug(chalk.red(validationError));
  }

  const statusCode = error.statusCode || statusCodeList.generalError;
  const message = error.statusCode
    ? error.message
    : privateMessageList.generalError;

  debug(chalk.bgRed(statusCode), chalk.red(message));

  res.status(statusCode).json({ message });
};

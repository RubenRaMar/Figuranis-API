import { type Request, type Response } from "express";
import { type NextFunction } from "express-serve-static-core";
import createDebug from "debug";
import CustomError from "../../../Classes/CustomError/CustomError.js";
import chalk from "chalk";

const debug = createDebug(
  "figuranisdb-api:server:middlewares:errors:errorMiddleware"
);

export const endpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const statusCode = 404;
  const message = "Endpoint not found";

  const error = new CustomError(statusCode, message);

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "Internal Server Error";

  debug(chalk.bgRed(statusCode), chalk.red(message));

  res.status(statusCode).json({ message });
};

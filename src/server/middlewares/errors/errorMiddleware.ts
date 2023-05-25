import { type Request, type Response } from "express";
import { type NextFunction } from "express-serve-static-core";
import createDebug from "debug";
import type CustomError from "../../../Classes/CustomError/CustomError.js";
import chalk from "chalk/index.js";

const debug = createDebug(
  "figuranisdb-api:server:middlewares:errors:errorMiddleware"
);

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

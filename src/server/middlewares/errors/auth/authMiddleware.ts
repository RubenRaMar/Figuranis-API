import jwt from "jsonwebtoken";
import { type NextFunction, type Response } from "express";
import type CustomRequest from "../../../controllers/figure/types.js";
import CustomError from "../../../Classes/CustomError/CustomError.js";

const auth = (req: CustomRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  try {
    if (!authHeader?.includes("Bearer ")) {
      throw new CustomError(401, "Missing token");
    }

    const token = authHeader.replace(/^Bearer\s*/i, "");

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = payload.sub;

    req.userId = userId as string;

    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default auth;

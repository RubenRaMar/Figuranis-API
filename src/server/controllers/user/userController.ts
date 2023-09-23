import { type NextFunction, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import CustomError from "../../Classes/CustomError/CustomError.js";
import { type UserCredentialsRequest } from "./types.js";
import User from "../../../database/models/User.js";
import {
  privateMessageList,
  publicMessageList,
  statusCodeList,
} from "../../utils/responseData/responseData.js";

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(
        statusCodeList.wrongCredentials,
        privateMessageList.wrongCredentials,
        publicMessageList.wrongCredentials
      );

      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "300d",
    });

    res.status(statusCodeList.ok).json({ token });
  } catch (error: unknown) {
    next(error);
  }
};

export const registerUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const regiteredUser = await User.create({
      username,
      password: hashedPassword,
    });

    if (!regiteredUser) {
      throw new CustomError(
        statusCodeList.badRequest,
        privateMessageList.registerError
      );
    }

    res.status(statusCodeList.add).json({ user: username });
  } catch (error) {
    next(error);
  }
};

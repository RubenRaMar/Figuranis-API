import { Types } from "mongoose";
import { type UserCredentialsRequest } from "./types";
import { type NextFunction, type Response } from "express";
import User from "../../../database/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import loginUser from "./userController";
import CustomError from "../../Classes/CustomError/CustomError";

describe("Given a loginUser middleware controller", () => {
  const userCredentialsMock = {
    username: "goku",
    password: "god",
  };

  const userCredentialsIdMock = {
    _id: new Types.ObjectId().toString(),
    username: "goku",
    password: "god",
  };

  const req: Pick<UserCredentialsRequest, "body"> = {
    body: userCredentialsMock,
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  User.findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockReturnValue(userCredentialsIdMock),
  });

  describe("When it invoked with de valid credentials and a response", () => {
    const token = "tokensito";

    bcrypt.compare = jest.fn().mockReturnValue(true);

    jwt.sign = jest.fn().mockReturnValue(token);

    test("Then it should call the response's method status with a 200", async () => {
      const expectedStatusCode = 200;

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toBeCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with a token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toBeCalledWith({ token });
    });
  });

  describe("When it invoked with a wrong username and a nest function ", () => {
    test("Then it should call the next function with a 401a 'Wrong credentials'", async () => {
      const expectedError = new CustomError(401, "Wrong credentials");
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

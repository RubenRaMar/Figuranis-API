import { Types } from "mongoose";
import { type UserCredentialsRequest } from "../types";
import { type NextFunction, type Response } from "express";
import User from "../../../../database/models/User";
import {
  privateMessageList,
  statusCodeList,
} from "../../../utils/responseData/responseData";
import { registerUser } from "../userController";
import CustomError from "../../../Classes/CustomError/CustomError";

describe("Given a registerUser controller", () => {
  const userCredentialsMock = {
    username: "goku",
    password: "god",
  };

  const userCredentialsIdMock = {
    _id: new Types.ObjectId().toString(),
    ...userCredentialsMock,
  };

  const req: Pick<UserCredentialsRequest, "body"> = {
    body: userCredentialsMock,
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it invoked with de valid credendials", () => {
    User.create = jest.fn().mockReturnValue(userCredentialsIdMock);

    test("Then it should call the response's method status with a 201", async () => {
      const expectedStatusCode = statusCodeList.add;

      await registerUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with the credentials", async () => {
      const { username: expectedUsername } = userCredentialsMock;

      await registerUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ user: expectedUsername });
    });
  });

  describe("When it invoked with a wrong username and a next function", () => {
    test("Then it should call the next function", async () => {
      const expectedError = new CustomError(
        statusCodeList.badRequest,
        privateMessageList.registerError
      );

      User.create = jest.fn().mockReturnValue(undefined);

      await registerUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

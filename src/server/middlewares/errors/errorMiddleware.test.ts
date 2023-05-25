import { type NextFunction, type Request, type Response } from "express";
import { endpointNotFound, generalError } from "./errorMiddleware.js";
import CustomError from "../../Classes/CustomError/CustomError.js";
import { type CustomResponse } from "../../../types.js";

const req = {};
const next = jest.fn();
const res: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a generalError middleware", () => {
  describe("When it invoked and recives a error for incorret credentials the next function", () => {
    const customError = new CustomError(401, "Wrong credentials");

    generalError(
      customError,
      req as Request,
      res as Response,
      next as NextFunction
    );

    test("Then it should response's a 401 status code", () => {
      const expectedStatusCode = 401;

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with'Wrong credentials'", () => {
      const expectedMessage = "Wrong credentials";

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it invoiked and receives a unknown error the next function", () => {
    const error = new Error("Internal Server Error");

    generalError(
      error as CustomError,
      req as Request,
      res as Response,
      next as NextFunction
    );

    test("Then it should  response's a statusCode 500", () => {
      const expectStatusCode = 500;

      expect(res.status).toHaveBeenCalledWith(expectStatusCode);
    });

    test("Then it should retun a 'Internal Server Error' message", () => {
      const expectMessage = "Internal Server Error";

      expect(res.json).toHaveBeenCalledWith({ message: expectMessage });
    });
  });
});

describe("Given a endpointNotFound middleware", () => {
  describe("When it invoked", () => {
    test("Then it should call a next function with a error 'Endpoint not found'", () => {
      const error = new CustomError(404, "Endpoint not found");

      endpointNotFound(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

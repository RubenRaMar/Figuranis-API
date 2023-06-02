import { type Request, type Response, type NextFunction } from "express";
import { type CustomRequest } from "./types.js";
import auth from "./authMiddleware.js";
import jwt from "jsonwebtoken";
import CustomError from "../../../Classes/CustomError/CustomError.js";

type CustomRequestHeader = Pick<Request, "header">;

describe("Given a authMiddleware function", () => {
  describe("When it is called and includes in the header the word 'Bearer '", () => {
    test("Then it should invoke the next function", () => {
      const token = "Tokensito";
      const req: CustomRequestHeader = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };
      const res = {};
      const next = jest.fn();

      jwt.verify = jest.fn().mockReturnValue(token);

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it is called and includes in the header the word 'Bearer'", () => {
    test("Then it should invoke the next function with error", () => {
      const token = "Tokensito";
      const req: CustomRequestHeader = {
        header: jest.fn().mockReturnValue(token),
      };

      const error = new CustomError(401, "Missing token");

      const res = {};
      const next = jest.fn();

      jwt.verify = jest.fn().mockReturnValue(token);

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

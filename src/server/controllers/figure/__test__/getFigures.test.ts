import { type NextFunction, type Response } from "express";
import type CustomRequestStructure from "../types.js";
import { type CustomResponse } from "../../../../types.js";
import { statusCodeList } from "../../../utils/responseData/responseData.js";
import { figuresMock } from "../../../../mocks/figures/figuresMocks.js";
import Figure from "../../../../database/models/Figure.js";
import { getFigures } from "../figureController.js";

type CustomRequestBody = Pick<CustomRequestStructure, "userId">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getFigures middleware", () => {
  const userId = "1a2b3c4d5e6f7a8b9c0d1e2f";

  const req: CustomRequestBody = {
    userId,
  };

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it invoked with a user id", () => {
    const figuresWithUserId = figuresMock.filter(
      (figure) => figure.user.toString() === userId
    );

    Figure.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(figuresWithUserId),
      }),
    });

    test("Then it should response with a 200 staus code", async () => {
      const expectedStatusCode = statusCodeList.ok;

      await getFigures(
        req as CustomRequestStructure,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should response with a figures belonging to the user", async () => {
      await getFigures(
        req as CustomRequestStructure,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ figures: figuresWithUserId });
    });
  });

  describe("When it invoking and re-executing the request", () => {
    test("Then it should call the next function with error 'Database error'", async () => {
      const expectedError = new Error("Database error");

      Figure.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockRejectedValue(expectedError),
        }),
      });

      await getFigures(
        req as CustomRequestStructure,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

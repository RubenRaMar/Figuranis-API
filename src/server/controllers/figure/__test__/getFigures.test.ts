import { type NextFunction, type Response } from "express";
import { type CustomResponse } from "../../../../types.js";
import { statusCodeList } from "../../../utils/responseData/responseData.js";
import { figuresMock } from "../../../../mocks/figures/figuresMocks.js";
import Figure from "../../../../database/models/Figure.js";
import { getFigures } from "../figureController.js";
import { type CustomRequest } from "../types.js";

type CustomRequestBody = Pick<CustomRequest, "userId" | "query">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getFigures middleware", () => {
  const userId = "1a2b3c4d5e6f7a8b9c0d1e2f";
  const query = {
    skip: "1",
    limit: "10",
    filter: "true",
  };

  const req: CustomRequestBody = {
    userId,
    query,
  };

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  const figuresWithUserId = figuresMock.filter(
    (figure) => figure.user.toString() === userId
  );

  describe("When it invoked with a user id", () => {
    Figure.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(figuresWithUserId),
          }),
        }),
      }),
    });

    Figure.where = jest.fn().mockReturnValue({
      countDocuments: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(figuresWithUserId.length),
      }),
    });

    test("Then it should response with a 200 staus code", async () => {
      const expectedStatusCode = statusCodeList.ok;

      await getFigures(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should response with a figures belonging to the user", async () => {
      await getFigures(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({
        figures: figuresWithUserId,
        length: figuresWithUserId.length,
      });
    });
  });

  describe("When it invoking and re-executing the request", () => {
    test("Then it should call the next function with error 'Database error'", async () => {
      const expectedError = new Error("Database error");

      Figure.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest.fn().mockRejectedValue(expectedError),
            }),
          }),
        }),
      });

      Figure.where = jest.fn().mockReturnValue({
        countDocuments: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(figuresWithUserId.length),
        }),
      });

      await getFigures(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

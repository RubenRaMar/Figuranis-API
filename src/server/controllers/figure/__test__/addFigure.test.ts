import { type Response, type NextFunction } from "express";
import { addFigure } from "../figureController";
import { figuresMock } from "../../../../mocks/figures/figuresMocks";
import { type CustomRequest } from "../types";
import Figure from "../../../../database/models/Figure";
import {
  privateMessageList,
  statusCodeList,
} from "../../../utils/responseData/responseData";
import CustomError from "../../../Classes/CustomError/CustomError";

describe("Given a addFigure controller", () => {
  const figureMock = figuresMock[0];

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it is invoked and receives a figure", () => {
    Figure.create = jest.fn().mockResolvedValue(figuresMock[0]);

    const req: Partial<CustomRequest> = {
      body: figureMock,
      userId: "646fc50910c8e8c5b17d54a7",
    };

    test("Then it should call response's method status with 201", async () => {
      await addFigure(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCodeList.add);
    });

    test("Then it should call response's method json with a 'Figure added correctly'", async () => {
      await addFigure(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({
        figure: figureMock,
      });
    });
  });

  describe("When it receive a bad request", () => {
    test("Then it should invoke to next funtion with a error", async () => {
      const req: Partial<CustomRequest> = {
        body: figureMock,
        userId: "646fc50910c8e8c5b17d54a7",
      };

      const error = new CustomError(
        statusCodeList.badRequest,
        privateMessageList.addError
      );

      Figure.create = jest.fn().mockResolvedValue(undefined);

      await addFigure(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
